const { uncaughtException } = require('../../lib')

const assert = require('assert')

process.on('uncaughtException', uncaughtException)

assert.throws(() => {
  throw new TypeError('uncaughtException:TypeError')
})
