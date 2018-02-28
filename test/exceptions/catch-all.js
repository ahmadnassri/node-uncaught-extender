'use strict'

const { uncaughtException } = require('../..')

const tap = require('tap')
const ExtendableError = require('@ahmadnassri/error')

class CustomError extends ExtendableError {}

process.on('uncaughtException', uncaughtException)
process.on('uncaughtException:*', error => {
  tap.test('capture all errors', assert => {
    assert.plan(1)
    assert.equal(error.message, 'uncaughtException:*')
  })
})

throw new CustomError('uncaughtException:*')
