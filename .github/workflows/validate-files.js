const path = require('path')
const { checkDtmiPathFromFile } = require('../../repo-convention')

for (let i = 1; i < process.argv.length; i++) {
  const file = path.resolve(process.argv[i])
  if (file.startsWith(path.join(process.cwd(), 'dtmi/'))) {
    console.log('\nchecking: ' + file)
    if (!checkDtmiPathFromFile(file)) {
      process.exit(1)
    }
    console.log('SUCCESS: File/Folder names OK on: ', file)
  } else {
    console.debug('Skipping file not in the dtmi/ folder: ' + file)
  }
}
