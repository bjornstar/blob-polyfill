import assert from "node:assert/strict";
import * as is from "@sindresorhus/is";

import BlobPolyfill from "../Blob.js";

const Blob = BlobPolyfill.Blob;
const File = BlobPolyfill.File;
const FileReader = BlobPolyfill.FileReader;
const URL = BlobPolyfill.URL;

describe("blob-polyfill", () => {
	describe("Blob", () => {
		it("Does not pollute the global Blob definition", () => {
			if (typeof global.Blob === "function") {
				assert(Blob === global.Blob);
				assert.strictEqual(Blob.isPolyfill, undefined);
			} else {
				assert.strictEqual(typeof global.Blob, "undefined");
				assert.throws(() => {
					new global.Blob();
				}, TypeError, "global.Blob should not be a constructor");
				assert.strictEqual(Blob.isPolyfill, true);
			}
		});

		it("At the very least, we can instantiate an empty Blob", () => {
			const blob = new Blob();

			assert.strictEqual(blob.size, 0);
			assert.strictEqual(blob.type, "");
		});

		it("We can instantiate a json Blob", () => {
			const example = { hello: "world" };
			const blob = new Blob([JSON.stringify(example, null, 2)], { type : "application/json" });

			assert.strictEqual(blob.size, 22);
			assert.strictEqual(blob.type, "application/json");
		});

		it("We can instantiate a binary Blob", () => {
			const blob = new Blob([ new Uint8Array([1, 2, 3]) ], { type: "application/octet-binary" });
			assert.strictEqual(blob.size, 3);
			assert.strictEqual(blob.type, "application/octet-binary");
		});

		it("Symbol is Blob", () => {
			assert.strictEqual(Blob.prototype[Symbol.toStringTag], "Blob");
		});

		it("Blob.arrayBuffer() returns a promise that resolves with an ArrayBuffer", () => {
			const blob = new Blob();

			is.assert.promise(blob.arrayBuffer());

			return blob.arrayBuffer().then(function (value) {
				is.assert.arrayBuffer(value);
			});
		});

		it("Blob can be instantiated with ArrayBuffer, data can be recovered", () => {
			const testString = "Testing...";
			const arrayBuffer = stringToArrayBuffer(testString);
			const blob = new Blob([arrayBuffer]);
			return blob.arrayBuffer().then(function (value) {
				const testStringRecovered = arrayBufferToString(value);
				assert.strictEqual(testString, testStringRecovered);
			});
		});

		it("Does not modify the source array", () => {
			const array = ["mutation"];
			const clone = array.slice();
			new Blob(array);
			assert.deepStrictEqual(array, clone);
		});
	});

	describe("File", () => {
		it("Does not pollute the global File definition", () => {
			if (typeof global.File === "function") {
				assert.strictEqual(File, global.File);
				assert.strictEqual(File.isPolyfill, undefined);
			} else {
				assert.strictEqual(typeof global.File, "undefined");
				assert.throws(() => {
					new global.File();
				}, TypeError, "global.File should be undefined");
			}
		});

		it("We can instantiate a File", () => {
			const file = new File([], "");

			assert.strictEqual(file.size, 0);
			assert.strictEqual(file.type, "");
			assert.strictEqual(file.name, "");
		});

		it("Symbol is File or Blob", () => {
			assert.ok(["Blob", "File"].includes(File.prototype[Symbol.toStringTag]));
		});
	});

	describe("FileReader", () => {
		it("Does not pollute the global FileReader definition", () => {
			assert.strictEqual(typeof global.FileReader, "undefined");
			assert.throws(() => {
				new global.FileReader();
			}, TypeError, "global.FileReader should be undefined");
		});

		// As it stands, the FileReader does not work in node.
		it.skip("We can instantiate a FileReader", () => {
			const fileReader = new FileReader();

			assert.ok(fileReader);
		});

		it("Symbol is FileReader", () => {
			assert.strictEqual(FileReader.prototype[Symbol.toStringTag], "FileReader");
		});
	});

	describe("URL", () => {
		it("Modifies the global URL to always create Blobs if Blobs are not native", () => {
			assert.strictEqual(typeof global.URL, "function");
			assert.strictEqual(URL, global.URL);
			if (typeof global.Blob === "function") {
				assert.strictEqual(global.URL.createObjectURL.isPolyfill, undefined);
				assert.strictEqual(global.URL.revokeObjectURL.isPolyfill, undefined);
			} else {
				assert.strictEqual(typeof global.URL, "function");
				assert.strictEqual(URL, global.URL);
				assert.strictEqual(global.URL.createObjectURL.isPolyfill, true);
				assert.strictEqual(global.URL.revokeObjectURL.isPolyfill, true);
			}
		});
		it("We can call URL.createObjectUrl", () => {
			if (typeof global.Blob !== "function") {
				const polyfilledUrl = URL.createObjectURL(new File(["hello world"], "hello.txt", { type: "application/plain-text" }));
				assert.strictEqual(typeof polyfilledUrl, "string");
				assert.strictEqual(polyfilledUrl, "data:application/plain-text;base64,aGVsbG8gd29ybGQ=");
			} else {
				const nodeUrl = URL.createObjectURL(new File(["hello world"], "hello.txt", { type: "application/plain-text" }));
				assert.strictEqual(typeof nodeUrl, "string");
				assert.match(nodeUrl, /blob:nodedata:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/);
			}
		});
	});
});


function stringToArrayBuffer(string) {
	const buf = new ArrayBuffer(string.length * 2); // 2 bytes for each char
	const bufView = new Uint16Array(buf);
	for (let i = 0; i < string.length; i+= 1) {
		bufView[i] = string.charCodeAt(i);
	}
	return buf;
}

function arrayBufferToString(buffer) {
	const array = new Uint16Array(buffer);
	return String.fromCharCode.apply(null, array);
}
