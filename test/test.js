/* A script specifying the needed testing. */

const assert = require('assert');

function doublevalue(input){
	return 2*input
} // functionToTest

function test(value, expected) {
	assert.equal( doublevalue(value), expected);
	console.log(`\u001B[32m✓\u001B[39m ${expected}`);
}

test(11, 22);

