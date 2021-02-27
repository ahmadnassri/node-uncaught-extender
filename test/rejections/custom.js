const { unhandledRejection } = require('../../lib/')

const assert = require('assert')

const ExtendableError = require('@ahmadnassri/error')

class CustomError extends ExtendableError {}

process.on('unhandledRejection', unhandledRejection)

process.on('unhandledRejection:CustomError', (error, promise) => {
  assert.ok(promise instanceof Promise)
  assert.strictEqual(error.message, 'unhandledRejection:CustomError')
})

Promise.reject(new CustomError('unhandledRejection:CustomError'))
