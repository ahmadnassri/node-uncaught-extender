# uncaughtException & unhandledRejection Extender

Extends uncaughtException and unhandledRejection with custom listeners

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![super linter][super-linter-img]][super-linter-url]
[![test][test-img]][test-url]
[![semantic][semantic-img]][semantic-url]

## Usage

Use the native [`uncaughtException`][] or ['unhandledRejection'][] to setup:

> **IMPORTANT!** ensure this is declared as early as possible in your execution cycle

``` js
const { uncaughtException, unhandledRejection} = require('uncaught-extender')

process.on('uncaughtException', uncaughtException)
process.on('unhandledRejection', unhandledRejection)
```

Start listening to any event type that matches your expected `Error` name:

``` js
// specificy your listeners for uncaught exceptions
process.on('uncaughtException:*', error => {}) // catch-all event listener
process.on('uncaughtException:Error', error => {})
process.on('uncaughtException:TypeError', error => {})
process.on('uncaughtException:CustomError', error => {})
process.on('uncaughtException:DataBaseError', error => {})

// specificy your listeners for rejected promises
process.on('unhandledRejection:*', error => {}) // catch-all event listener
process.on('unhandledRejection:Error', error => {})
process.on('unhandledRejection:TypeError', error => {})
process.on('unhandledRejection:CustomError', error => {})
process.on('unhandledRejection:DataBaseError', error => {})
```

continue with building your business logic normally,
and when an exception is thrown or a Promise is rejected without a `catch` that matches one of your listener functions,
that function will be called with the `Error` object passed as the only argument.

If no match is found, the `Error` is thrown again to the main process.

###### Full Example

``` js
const { uncaughtException, unhandledRejection } = require('uncaught-extender')

process.on('uncaughtException', uncaughtException)
process.on('unhandledRejection', unhandledRejection)

process.on('unhandledRejection:Error', error => console.log(error.message))
process.on('uncaughtException:TypeError', error => console.log(error.message))

Promise.reject(new Error('this will be caught by unhandledRejection:Error'))

throw new TypeError('this will be caught by uncaughtException:TypeError')
```

## Warning: Using `'uncaughtException'` correctly

Note that `'uncaughtException'` is a crude mechanism for exception handling intended to be used only as a last resort.

The event should not be used as an equivalent to `On Error Resume Next`.
Unhandled exceptions inherently mean that an application is in an undefined state.
Attempting to resume application code without properly recovering from the exception can cause additional unforeseen and unpredictable issues.

Learn more on the [Official Node.js Documentation][]

  [`uncaughtException`]: https://nodejs.org/api/process.html#process_event_uncaughtexception
  ['unhandledRejection']: https://nodejs.org/api/process.html#process_event_unhandledrejection
  [Official Node.js Documentation]: https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-uncaught-extender

[release-url]: https://github.com/ahmadnassri/node-uncaught-extender/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/node-uncaught-extender

[super-linter-url]: https://github.com/ahmadnassri/node-uncaught-extender/actions?query=workflow%3Asuper-linter
[super-linter-img]: https://github.com/ahmadnassri/node-uncaught-extender/workflows/super-linter/badge.svg

[test-url]: https://github.com/ahmadnassri/node-uncaught-extender/actions?query=workflow%3Atest
[test-img]: https://github.com/ahmadnassri/node-uncaught-extender/workflows/test/badge.svg

[semantic-url]: https://github.com/ahmadnassri/node-uncaught-extender/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue
