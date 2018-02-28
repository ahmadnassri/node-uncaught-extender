'use strict'

const { uncaughtException } = require('../..')

const tap = require('tap')

process.on('uncaughtException', uncaughtException)

process.on('uncaughtException:TypeError', error => {
  tap.test('capture normal errors', assert => {
    assert.plan(1)
    assert.equal(error.message, 'uncaughtException:TypeError')
  })
})

throw new TypeError('uncaughtException:TypeError')
