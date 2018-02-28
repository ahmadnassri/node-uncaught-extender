'use strict'

const { unhandledRejection } = require('../..')

const tap = require('tap')

process.on('unhandledRejection', unhandledRejection)
process.on('unhandledRejection:*', (error, promise) => {
  tap.test('capture all errors', assert => {
    assert.plan(2)
    assert.type(promise, 'Promise')
    assert.equal(error.message, 'unhandledRejection:*')
  })
})

Promise.reject(new Error('unhandledRejection:*'))
