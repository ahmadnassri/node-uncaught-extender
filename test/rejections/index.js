'use strict'

const { unhandledRejection } = require('../..')

const tap = require('tap')

process.on('unhandledRejection', unhandledRejection)

process.on('unhandledRejection:TypeError', (error, promise) => {
  tap.test('capture custom errors', assert => {
    assert.plan(2)
    assert.type(promise, 'Promise')
    assert.equal(error.message, 'unhandledRejection:TypeError')
  })
})

Promise.reject(new TypeError('unhandledRejection:TypeError'))
