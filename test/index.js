'use strict'

const uncaughtExceptionHandler = require('..')

const tap = require('tap')

process.on('uncaughtException', uncaughtExceptionHandler)

process.on('uncaughtException:TypeError', error => {
  tap.test('capture normal errors', assert => {
    assert.plan(1)
    assert.equal(error.message, 'uncaughtException:TypeError')
  })
})

throw new TypeError('uncaughtException:TypeError')
