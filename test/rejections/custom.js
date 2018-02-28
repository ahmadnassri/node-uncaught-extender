'use strict'

const { unhandledRejection } = require('../..')

const tap = require('tap')
const ExtendableError = require('@ahmadnassri/error')

class CustomError extends ExtendableError {}

process.on('unhandledRejection', unhandledRejection)

process.on('unhandledRejection:CustomError', (error, promise) => {
  tap.test('capture custom errors', assert => {
    assert.plan(2)
    assert.type(promise, 'Promise')
    assert.equal(error.message, 'unhandledRejection:CustomError')
  })
})

Promise.reject(new CustomError('unhandledRejection:CustomError'))
