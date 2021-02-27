const { uncaughtException } = require('../../lib/')

const assert = require('assert')

const ExtendableError = require('@ahmadnassri/error')

class CustomError extends ExtendableError {}

process.on('uncaughtException', uncaughtException)

process.on('uncaughtException:CustomError', error => {
  assert.strictEqual(error.message, 'uncaughtException:CustomError')
})

throw new CustomError('uncaughtException:CustomError')
