// Usage:
// cat phoneme_list.txt | node phonemize-syllablize.js filename.txt [--make-module]
var split = require('split');
var cmuTextToPhonemeStream = require('./cmu-text-to-phoneme');
var syllablizeThrough = require('./syllablize-through');
var stringifyThrough = require('./stringify-through');
var fs = require('fs');

var start = process.hrtime();

var settings = {
  outFilename: process.argv[2]
};  

var writableFileStream = fs.createWriteStream(settings.outFilename, {
  flags: 'w',
  encoding: 'utf8',
});

writableFileStream.on('close', function writableStreamClosed() {
	var elapsedTime = process.hrtime(start);
	process.stderr.write('Syllablize took %d seconds and %d nanoseconds', 
		elapsedTime[0], elapsedTime[1]);
});

if ('--make-module' === process.argv[3]) {
	writableFileStream.write('module.exports = ');
}

process.stdin.setEncoding('utf8');


process.stdin
	.pipe(split())
	.pipe(cmuTextToPhonemeStream)
	.pipe(syllablizeThrough.createStream())
	.pipe(stringifyThrough.createStream({followupString: '\n'}))
	.pipe(writableFileStream);


