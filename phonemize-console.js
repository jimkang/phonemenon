// Usage:
// cat phoneme_list.txt | node phonemize-console.js
var cmuTextToPhonemeMod = require('./cmu-text-to-phoneme');
var JSONToStdoutStream = require('./jsontostdoutstream');
var split = require('split');

var settings = {
};

process.stdin.setEncoding('utf8');

process.stdin
	.pipe(split())
	.pipe(cmuTextToPhonemeMod.textToPhonemeStream)
	.pipe(new JSONToStdoutStream());

