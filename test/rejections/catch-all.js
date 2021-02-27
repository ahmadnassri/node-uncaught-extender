const { unhandledRejection } = require('../../lib/')

const assert = require('assert')

process.on('unhandledRejection', unhandledRejection)
process.on('unhandledRejection:*', (error, promise) => {
  assert.ok(promise instanceof Promise)
  assert.strictEqual(error.message, 'unhandledRejection:*')
})

Promise.reject(new Error('unhandledRejection:*'))
