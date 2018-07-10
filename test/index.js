var assert = require("assert");

var Blob = require("../Blob.js").Blob;

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
