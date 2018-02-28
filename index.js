'use strict'

module.exports = function uncaughtExceptionHandler (uncaughtException) {
  const name = uncaughtException.constructor.name

  // list all registered event handlers
  const eventNames = process.eventNames()

  // find one that matches thrown error
  const handler = eventNames.find(eventName => eventName === `uncaughtException:${name}`)

  // pass it along
  if (handler) {
    return process.emit(handler, uncaughtException)
  }

  // see if a catchall (*) is available
  const catchall = eventNames.find(eventName => eventName === `uncaughtException:*`)

  // pass it along
  if (catchall) {
    return process.emit(catchall, uncaughtException)
  }

  // throw it back if nothing matches
  throw uncaughtException
}
