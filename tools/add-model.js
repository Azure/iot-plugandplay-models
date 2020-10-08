const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const { dtmiToPath, checkIds } = require('../repo-convention.js')

const createInterfaceFromFile = file => {
  const jsonDtdl = JSON.parse(fs.readFileSync(file, 'utf-8'))
  createInterfaceFromJson(jsonDtdl)
}

const createInterfaceFromJson = jsonDtdl => {
  const dtmi = jsonDtdl['@id']
  const fileName = path.join(process.cwd(), dtmiToPath(dtmi))
  if (fs.existsSync(fileName)) {
    console.log(`ERROR: ID ${dtmi} already exists at ${fileName} . Aborting `)
    return false
  }
  mkdirp(path.dirname(fileName)).then(m => {
    fs.writeFileSync(fileName, JSON.stringify(jsonDtdl, null, 2))
    console.log(`Model ${dtmi} added successfully to ${fileName}`)
  })
}

/**
 * @description Adds a model to the repo. Validates ids, dependencies and set the right folder/file name
 * @param {string} file
 */
const addModel = (file) => {
  const rootJson = JSON.parse(fs.readFileSync(file, 'utf-8'))

  if (Array.isArray(rootJson)) {
    rootJson.forEach(d => {
      checkIds(d)
      createInterfaceFromJson(d)
    })
    return rootJson[0]['@id']
  } else {
    checkIds(rootJson)
    createInterfaceFromFile(file)
    return rootJson['@id']
  }
}

const main = () => {
  const file = process.argv[2]
  console.log(`processing: ${file}`)
  const id = addModel(file)
  console.log(id)
}

main()
