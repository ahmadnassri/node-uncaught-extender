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
  /* istanbul ignore else */
  if (catchall) {
    return process.emit(catchall, error, ...args)
  }

  // throw it back if nothing matches
  /* istanbul ignore next */
  throw error
}

exports.uncaughtException = error => filter('uncaughtException', error, [])
exports.unhandledRejection = (reason, promise) => filter('unhandledRejection', reason, [promise])
