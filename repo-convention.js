const fs = require('fs')
const path = require('path')
const jsonata = require('jsonata')

/**
 * @description Validates DTMI with RegEx from https://github.com/Azure/digital-twin-model-identifier#validation-regular-expressions
 * @param {string} dtmi
 */
const isDtmi = dtmi => RegExp('^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$').test(dtmi)

/**
 * @description Converts DTMI to /dtmi/com/example/device-1.json path.
 * @param {string} dtmi
 * @returns {string}
 */
const dtmiToPath = dtmi => isDtmi(dtmi) ? `/${dtmi.toLowerCase().replace(/:/g, '/').replace(';', '-')}.json` : null

/**
 * @description Returns external IDs in `extend` and `component` elements
 * @param {{ extends: any[]; contents: any[]; }} rootJson
 * @returns {Array<string>}
 */
const getDependencies = rootJson => {
  let deps = []
  if (Array.isArray(rootJson)) {
    deps = rootJson.map(d => d['@id'])
    return deps
  }
  if (rootJson.extends) {
    if (Array.isArray(rootJson.extends)) {
      rootJson.extends.forEach(e => deps.push(e))
    } else {
      deps.push(rootJson.extends)
    }
  }
  if (rootJson.contents) {
    const comps = rootJson.contents.filter(c => c['@type'] === 'Component')
    comps.forEach(c => {
      if (typeof c.schema !== 'object') {
        if (deps.indexOf(c.schema) === -1) {
          deps.push(c.schema)
        }
      }
    })
  }
  return deps
}

/**
 * @description Checks all dependencies are available
 * @param {Array<string>} deps
 * @returns {boolean}
 */
const checkDependencies = dtmi => {
  let result = true
  const fileName = path.join(__dirname, dtmiToPath(dtmi))
  console.log(`Validating dependencies for ${dtmi} from ${fileName}`)
  const dtdlJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
  const deps = getDependencies(dtdlJson)
  deps.forEach(d => {
    const fileName = path.join(__dirname, dtmiToPath(d))
    if (fs.existsSync(fileName)) {
      console.log(`Dependency ${d} found`)
      const model = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
      if (model['@id'] !== d) {
        console.error(`ERROR: LowerCase issue with dependent id ${d}. Was ${model['@id']}. Aborting`)
        result = result && true
      }
    } else {
      console.error(`ERROR: Dependency ${d} NOT found. Aborting`)
      result = false
    }
  })
  return result
}

/**
 * @description Validates all internal IDs follow the namepspace set by the root id
 * @param {any} dtdlJson
 * @returns {boolean}
 */
const checkIds = dtdlJson => {
  const rootId = dtdlJson['@id']
  console.log(`checkIds: validating root ${rootId}`)
  const ids = jsonata('**."@id"').evaluate(dtdlJson)
  if (Array.isArray(ids)) {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      console.log('found: ' + id)
      if (!isDtmi(id)) {
        console.log(`ERROR: Document id ${id} is not a valid DTMI.`)
        return false
      }
      if (!id.split(';')[0].startsWith(rootId.split(';')[0])) {
        console.log(`ERROR: Document id ${id} does not satisfy the root id ${rootId}.`)
        return false
      }
    }
    console.log(`checkIds: Validated: ${ids.length} ids are under the root DTMI.`)
    return true
  } else {
    console.log('checkIds: Validated: Global ids not found.')
    return true
  }
}

/**
 * @description Checks if the folder/name convention matches the DTMI
 * @param {string} file
 * @returns {boolean}
 */
const checkDtmiPathFromFile = file => {
  const model = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const id = model['@id']
  if (id) {
    const expectedPath = path.join(process.cwd(), dtmiToPath(model['@id']))
    if (path.resolve(file) !== expectedPath) {
      console.log(`ERROR: in current path ${path.normalize(file)}, expecting ${expectedPath}.`)
      return false
    } else {
      console.log(`FilePath ${file} for ${id} seems OK.`)
      return true
    }
  } else {
    console.log('ERROR: @id not found.')
    return false
  }
}
module.exports = { dtmiToPath, isDtmi, checkIds, getDependencies, checkDependencies, checkDtmiPathFromFile }
