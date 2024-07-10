# `blob-polyfill` CHANGELOG

## v9.0.20240710
* [Blob.js] Use exported FileReader (@luke-stead-sonocent)
* [test] Test is now a module (@bjornstar)
* [README.md] Add badge for `master` branch build status  (@bjornstar)
* [package.json] Update devDependencies: `@sindresorhus/is`, `eslint`, & `mocha` (@bjornstar)
* [bower.json] Match current version (@bjornstar)
* [.eslintrc.js] Change to `eslint.config.mjs` for eslint@9 (@bjornstar)

## v8.0.20240630
* [Blob.js] Change Blob.prototype to global.Blob.prototype (@tmisirpash)
* [Blob.js] Make it work in environments where global.Blob exists, but global.FileReader does not (@bjornstar)
* [Blob.js] Add `isPolyfill` property to the polyfilled versions so we can differentiate them (@bjornstar)
* [test] Unskip tests and update to work in environments with global.Blob & global.File & global.URL (@bjornstar)
* [.github] Update action versions and test node v12-v22 (@bjornstar)

## v7.0.20220408
* [Blob.js] Do not modify array that is passed into constructor (@zyrong)
* [.github] Start automated tests on github (@bjornstar)
* [.travis.yml] Remove travis-ci integration (@bjornstar)
* [.npmignore] Ignore .github, remove .travis.yml (@bjornstar)
* [devDependencies] Update test dependencies (@bjornstar)

## v6.0.20211015
* [Blob.js] Check object class names when determining Object types (@coclauso)
* [Blob.js] Reduce redundancies in getting class names and prototype checks (@bjornstar)
* [test] Add a test for round tripping data in ArrayBuffers (@coclauso)

## v5.0.20210201
* [Blob.js] Blob.arrayBuffer() should return a promise that resolves with an ArrayBuffer (@bjornstar)
* [test] Add a test for Blob.arrayBuffer (@bjornstar)
* [package.json] Update devDependencies: `eslint` & `mocha` (@bjornstar)
* [package.json] Add devDependency: `@sindresorhus/is` (@bjornstar)

## v4.0.20200601
* [Blob.js] Populate File and FileReader in exports after confirming File is supported (@bjornstar)

## v4.0.20200531
* [Blob.js] Do not attempt to set readonly property Symbols (@bjornstar)
* [Blob.js] Do not use prototype built-ins (@bjornstar)
* [.travis.yml] Drop testing for node v6 and v8 (@bjornstar)
* [.travis.yml] Add testing for node v14 (@bjornstar)
* [package.json] Update devDependencies: `eslint` & `mocha` (@bjornstar)
* [.gitignore] Add `npm-debug.log` (@bjornstar)
* [README] Add usage examples to encourage non-global use of Blob (@bjornstar)

## v4.0.20190430
* A complete rewrite of Blob.js (@jimmywarting)
* Restore the UMD wrapper (@bjornstar)
* Add some tests for File, FileReader, and URL (@bjornstar)

## v3.0.20180112
* Resolve conflict from upstream based on date version change (@bjornstar)
* Remove `this.content` to match upstream changes (@bjornstar)
* Added some very basic tests (@bjornstar)
* Added linting through eslint (@bjornstar)
* Start using travis-ci to verify basic functionality isn't breaking (@bjornstar)

## v2.0.20171115
* Add UMD wrapper to allow non-global polluting usage in Node (@jscinoz)
* License clarification (@eligrey)
* Clarified browser support in the readme (@eligrey)
* Add CHANGELOG (@bjornstar)

## v1.0.20150320
* Add support for PhantomJS (@mitar)
* Add package.json (@bjornstar)
* Add bower.json (@bjornstar)
* Release on npm as blob-polyfill (@bjornstar)
