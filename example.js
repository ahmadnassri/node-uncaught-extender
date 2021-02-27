const { uncaughtException, unhandledRejection } = require('.')

process.on('uncaughtException', uncaughtException)
process.on('unhandledRejection', unhandledRejection)

process.on('unhandledRejection:Error', error => console.log(error.message))
process.on('uncaughtException:TypeError', error => console.log(error.message))

Promise.reject(new Error('this will be caught by unhandledRejection:Error'))

throw new TypeError('this will be caught by uncaughtException:TypeError')
