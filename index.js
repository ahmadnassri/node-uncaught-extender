'use strict'

function filter (prefix, error, args) {
  const name = error.constructor.name

  // list all registered event handlers
  const eventNames = process.eventNames()

  // find one that matches thrown error
  const handler = eventNames.find(eventName => eventName === `${prefix}:${name}`)

  // pass it along
  if (handler) {
    return process.emit(handler, error, ...args)
  }

  // see if a catchall (*) is available
  const catchall = eventNames.find(eventName => eventName === `${prefix}:*`)

  // pass it along
  if (catchall) {
    return process.emit(catchall, error, ...args)
  }

  // throw it back if nothing matches
  throw error
}

exports.uncaughtException = error => filter('uncaughtException', error, [])
exports.unhandledRejection = (error, promise) => filter('unhandledRejection', error, [promise])
