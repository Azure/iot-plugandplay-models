const path = require('path')
const fs = require('fs')
const { checkIds } = require('../../repo-convention')

for (let i = 2; i < process.argv.length; i++) {
  const file = path.resolve(process.argv[i])
  console.log('Validating file', file)
  if (file.startsWith(path.join(process.cwd(), 'dtmi/'))) {
    console.log('\nchecking: ' + file)
    if (!checkIds(JSON.parse(fs.readFileSync(file, 'utf-8')))) {
      console.error(`ERROR validating ids on file ${file}. Aborting.`)
      process.exit(1)
    }
    console.log('SUCCESS: Global Ids OK on: ', file)
  } else {
    console.debug('Skipping file not in the dtmi/ folder: ' + file)
  }
}
