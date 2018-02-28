'use strict'

const uncaughtExceptionHandler = require('..')

const tap = require('tap')
const ExtendableError = require('@ahmadnassri/error')

class CustomError extends ExtendableError {}

process.on('uncaughtException', uncaughtExceptionHandler)

process.on('uncaughtException:CustomError', error => {
  tap.test('capture custom errors', assert => {
    assert.plan(1)
    assert.equal(error.message, 'uncaughtException:CustomError')
  })
})

throw new CustomError('uncaughtException:CustomError')
