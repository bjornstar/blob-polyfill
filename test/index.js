var assert = require("assert");
var BlobPolyfill = require("../Blob.js");

var Blob = BlobPolyfill.Blob;
var File = BlobPolyfill.File;
var FileReader = BlobPolyfill.FileReader;
var URL = BlobPolyfill.URL;

describe("blob-polyfill", function () {
	describe("Blob", function () {
		it("Does not pollute the global Blob definition", function () {
			assert.strictEqual(typeof global.Blob, "undefined");
			assert.throws(function () {
				new global.Blob();
			}, TypeError, "global.Blob should not be a constructor");
		});

		it("At the very least, we can instantiate an empty Blob", function () {
			var blob = new Blob();

			assert.strictEqual(blob.size, 0);
			assert.strictEqual(blob.type, "");
		});

		it("We can instantiate a json Blob", function () {
			var example = { hello: "world" };
			var blob = new Blob([JSON.stringify(example, null, 2)], { type : "application/json" });

			assert.strictEqual(blob.size, 22);
			assert.strictEqual(blob.type, "application/json");
		});

		it("We can instantiate a binary Blob", function () {
			var blob = new Blob([ new Uint8Array([1, 2, 3]) ], { type: "application/octet-binary" });
			assert.strictEqual(blob.size, 3);
			assert.strictEqual(blob.type, "application/octet-binary");
		});

		it("Symbol is Blob", function () {
			assert.strictEqual(Blob.prototype[Symbol.toStringTag], "Blob");
		});
	});

	describe("File", function () {
		it("Does not pollute the global File definition", function () {
			assert.strictEqual(typeof global.File, "undefined");
			assert.throws(function () {
				new global.File();
			}, TypeError, "global.File should be undefined");
		});

		it("We can instantiate a File", function () {
			var file = new File([], "");

			assert.strictEqual(file.size, 0);
			assert.strictEqual(file.type, "");
			assert.strictEqual(file.name, "");
		});

		it("Symbol is File", function () {
			assert.strictEqual(File.prototype[Symbol.toStringTag], "File");
		});
	});

	describe("FileReader", function () {
		it("Does not pollute the global FileReader definition", function () {
			assert.strictEqual(typeof global.FileReader, "undefined");
			assert.throws(function () {
				new global.FileReader();
			}, TypeError, "global.FileReader should be undefined");
		});

		// As it stands, the FileReader does not work in node.
		it.skip("We can instantiate a FileReader", function () {
			var fileReader = new FileReader();

			assert.ok(fileReader);
		});

		it("Symbol is FileReader", function () {
			assert.strictEqual(FileReader.prototype[Symbol.toStringTag], "FileReader");
		});
	});

	describe("URL", function () {
		it.skip("Does not pollute the global URL definition", function () {
			assert.strictEqual(typeof global.URL, "function");
			assert.notStrictEqual(URL, global.URL);
		});
		it("We can call URL.createObjectUrl", function () {
			var url = URL.createObjectURL(new File(["hello world"], "hello.txt", { type: "application/plain-text" }));
			assert.strictEqual(typeof url, "string");
			assert.strictEqual(url, "data:application/plain-text;base64,aGVsbG8gd29ybGQ=");
		});
	});
});
