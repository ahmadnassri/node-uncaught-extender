# uncaughtException Extender [![version][npm-version]][npm-url] [![License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codeclimate-coverage]][codeclimate-url]

> Extends process.on('uncaughtException') with custom handlers

## Install

```bash
npm install --production --save uncaught-exception-extender
```

## Usage

Use the native [`uncaughtException`](https://nodejs.org/api/process.html#process_event_uncaughtexception) to setup:

> **IMPORTANT!** ensure this is declared as early as possible in your execution cycle

```js
process.on('uncaughtException', require('uncaught-exception-extender'))
```

Start listening to any event type that matches your expected `Error` name:

```js
// specific your handlers
process.on('uncaughtException:*', error => {}) // catch-all event listener
process.on('uncaughtException:Error', error => {})
process.on('uncaughtException:TypeError', error => {})
process.on('uncaughtException:CustomError', error => {})
process.on('uncaughtException:DataBaseError', error => {})
```

continue with building your business logic normally, and when an exception is thrown that matches one of your listener functions, that function will be called with the `Error` object passed as the only argument.

If no match is found, the `Error` is thrown again to the main process.

###### Example

```js
process.on('uncaughtException', uncaughtExceptionHandler)

process.on('uncaughtException:TypeError', error => console.log('hello, I\'m a type error!')

throw new TypeError('uncaughtException:TypeError')
```

## Warning: Using `'uncaughtException'` correctly

Note that `'uncaughtException'` is a crude mechanism for exception handling intended to be used only as a last resort. The event should not be used as an equivalent to `On Error Resume Next`. Unhandled exceptions inherently mean that an application is in an undefined state. Attempting to resume application code without properly recovering from the exception can cause additional unforeseen and unpredictable issues.

Learn more on the [Official Node.js Documentation](https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly)

---
> License: [ISC][license-url] &bull; 
> Copyright: [ahmadnassri.com](https://www.ahmadnassri.com) &bull; 
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &bull; 
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/uncaught-exception-extender.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/uncaught-exception-extender
[travis-image]: https://img.shields.io/travis/ahmadnassri/uncaught-exception-extender.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/uncaught-exception-extender
[npm-version]: https://img.shields.io/npm/v/uncaught-exception-extender.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/uncaught-exception-extender
[codeclimate-coverage]: https://api.codeclimate.com/v1/badges/05c12808ff97448cd50c/test_coverage?style=flat-square
