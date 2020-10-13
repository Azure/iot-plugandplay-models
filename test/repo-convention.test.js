const rc = require('../repo-convention.js')
const td = require('./test-models')

test('is valid dtmi', () => {
  expect(rc.isDtmi('dtmi:with::twosemicolons;1')).toBe(false)
})

test('invalid dtmi', () => {
  expect(rc.dtmiToPath('')).toBe(null)
  expect(rc.dtmiToPath('notadtmi')).toBe(null)
  expect(rc.dtmiToPath('dtmi:notadtmi')).toBe(null)
  expect(rc.dtmiToPath('dtmi:com:example:thermostat:1')).toBe(null)
  expect(rc.dtmiToPath('dtmi:com:example-bad:thermostat;1')).toBe(null)
})

test('dtmi to path', () => {
  expect(rc.dtmiToPath('dtmi:com:example:Thermostat;1')).toBe('/dtmi/com/example/thermostat-1.json')
  expect(rc.dtmiToPath('dtmi:com:Example:thermostat;1')).toBe('/dtmi/com/example/thermostat-1.json')
})

test('get dependencies', () => {
  expect(rc.getDependencies(td.noDepsJson)).toEqual([])
  expect(rc.getDependencies(td.oneDepJson)).toEqual(['dtmi:test:base;1'])
  expect(rc.getDependencies(td.twoDepsJson)).toEqual(['dtmi:test:base;1', 'dtmi:test:onedep:comp1;1'])
})

test('check ids', () => {
  expect(rc.checkIds(td.globalId)).toBe(false)
  expect(rc.checkIds(td.oneDepJson)).toBe(true)
})

test('checkDtmiPathFromFile', () => {
  expect(rc.checkDtmiPathFromFile('dtmi/azure/devicemanagement/deviceinformation-1.json')).toBe(true)
  expect(rc.checkDtmiPathFromFile('test/badpath.json')).toBe(false)
})
