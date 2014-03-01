// Usage:
// cat phoneme_list.txt | node phonemize.js
var cmuTextToPhonemeMod = require('./cmu-text-to-phoneme');
var JSONToStdoutStream = require('./jsontostdoutstream');

var settings = {
};

cmuTextToPhonemeMod.textToPhoneme(process.stdin, new JSONToStdoutStream(), 200);

