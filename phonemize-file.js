// Usage:
// cat phoneme_list.txt | node phonemize-file.js filename.txt
var cmuTextToPhonemeStream = require('./cmu-text-to-phoneme');
var fs = require('fs');
var Writable = require('stream').Writable;
var split = require('split');
var stringifyThrough = require('./stringify-through');


var settings = {
  outFilename: process.argv[2]
};  

var writableFileStream = fs.createWriteStream(settings.outFilename, {
  flags: 'w',
  encoding: 'utf8',
});

process.stdin.setEncoding('utf8');

process.stdin
  .pipe(split())
  .pipe(cmuTextToPhonemeStream)
  .pipe(stringifyThrough.createStream({followupString: '\n'}))
  .pipe(writableFileStream);

