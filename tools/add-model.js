const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const { dtmiToPath, checkIds, checkDependencies, isDtmi } = require('../repo-convention.js')

const createInterfaceFromFile = async file => {
  const jsonDtdl = JSON.parse(fs.readFileSync(file, 'utf-8'))
  await createInterfaceFromJson(jsonDtdl)
}

const createInterfaceFromJson = async jsonDtdl => {
  const dtmi = jsonDtdl['@id']
  const fileName = path.join(process.cwd(), dtmiToPath(dtmi))
  if (fs.existsSync(fileName)) {
    console.log(`ERROR: ID ${dtmi} already exists at ${fileName} . Aborting `)
    process.exit(1)
  }
  await mkdirp(path.dirname(fileName))
  fs.writeFileSync(fileName, JSON.stringify(jsonDtdl, null, 2))
  console.log(`Model ${dtmi} added successfully to ${fileName}`)
}

/**
 * @description Adds a model to the repo. Validates ids, dependencies and set the right folder/file name
 * @param {string} file
 */
const addModel = async file => {
  const rootJson = JSON.parse(fs.readFileSync(file, 'utf-8'))

  if (rootJson && rootJson['@id']) {
    if (!isDtmi(rootJson['@id'])) {
      console.error('ERRROR: Input document does not have a valid id', rootJson['@id'])
      process.exit(1)
    }
  } else {
    console.error('ERRROR: Input file does not have an id')
    process.exit(1)
  }

  if (Array.isArray(rootJson)) {
    rootJson.forEach(async d => {
      checkIds(d)
      await createInterfaceFromJson(d)
    })
    return rootJson[0]['@id']
  } else {
    checkIds(rootJson)
    await createInterfaceFromFile(file)
    return rootJson['@id']
  }
}

const main = async () => {
  const file = process.argv[2]
  console.log(`processing: ${file}`)
  const id = await addModel(file)
  if (id && !checkDependencies(id)) {
    fs.unlinkSync(path.join(process.cwd(), dtmiToPath(id)))
    console.log('ERROR: Dont forget to include all the dependencies before submitting.')
    process.exit(1)
  }
  if (id && !checkIds(JSON.parse(fs.readFileSync(file, 'utf-8')))) {
    fs.unlinkSync(path.join(process.cwd(), dtmiToPath(id)))
    console.log('ERROR: Invalid IDs found. Plese fix those before submitting.')
    process.exit(1)
  }
  console.log(`SUCCESS: File ${file} added to ${dtmiToPath(id)}`)
}

main()
