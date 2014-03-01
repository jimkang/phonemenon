// Usage:
// cat phoneme_list.txt | node phonemize-console.js
var cmuTextToPhonemeMod = require('./cmu-text-to-phoneme');
var split = require('split');
var stringifyThrough = require('./stringify-through');

var settings = {
};

process.stdin.setEncoding('utf8');

process.stdin
	.pipe(split())
	.pipe(cmuTextToPhonemeMod.textToPhonemeStream)
	.pipe(stringifyThrough.createStream({indentString: '  '}))
	.pipe(process.stdout);

