const { uncaughtException } = require('../../lib/')

const assert = require('assert')

process.on('uncaughtException', uncaughtException)

process.on('uncaughtException:TypeError', error => {
  assert.strictEqual(error.message, 'uncaughtException:TypeError')
})

throw new TypeError('uncaughtException:TypeError')
