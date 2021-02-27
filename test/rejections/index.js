const { unhandledRejection } = require('../../lib/')

const assert = require('assert')

process.on('unhandledRejection', unhandledRejection)

process.on('unhandledRejection:TypeError', (error, promise) => {
  assert.ok(promise instanceof Promise)
  assert.strictEqual(error.message, 'unhandledRejection:TypeError')
})

Promise.reject(new TypeError('unhandledRejection:TypeError'))
