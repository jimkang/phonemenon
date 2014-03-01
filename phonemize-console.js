// Usage:
// cat phoneme_list.txt | node phonemize-console.js
var cmuTextToPhonemeStream = require('./cmu-text-to-phoneme');
var split = require('split');
var stringifyThrough = require('./stringify-through');

var settings = {
};

process.stdin.setEncoding('utf8');

process.stdin
	.pipe(split())
	.pipe(cmuTextToPhonemeStream)
	.pipe(stringifyThrough.createStream({indentString: '  '}))
	.pipe(process.stdout);

