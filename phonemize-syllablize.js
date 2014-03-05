// Usage:
// cat phoneme_list.txt | node phonemize-syllablize.js filename.txt [--make-module]
var split = require('split');
var cmuTextToPhonemeStream = require('./cmu-text-to-phoneme');
var syllablizeThrough = require('./syllablize-through');
var stringifyThrough = require('./stringify-through');
var fs = require('fs');

var settings = {
  outFilename: process.argv[2]
};  


// var analysisStream = new AnalyzePhonemeFollowerStream({
// 	objectMode: true,
// 	done: function analysisDone(error, followerFreqsForPhonemes) {
// 		if (error) {
// 			console.log(error);
// 		}
// 		else {
			var writableFileStream = fs.createWriteStream(settings.outFilename, {
			  flags: 'w',
			  encoding: 'utf8',
			});
			if ('--make-module' === process.argv[3]) {
				writableFileStream.write('module.exports = ');
			}

			// writableFileStream.write(
			// 	JSON.stringify(followerFreqsForPhonemes, null, '  '));

// 			if ('--make-module' === process.argv[3]) {
// 				writableFileStream.write(';\n');
// 			}
// 		}
// 	}
// });

process.stdin.setEncoding('utf8');

process.stdin
	.pipe(split())
	.pipe(cmuTextToPhonemeStream)
	.pipe(syllablizeThrough.createStream())
	.pipe(stringifyThrough.createStream({followupString: '\n'}))
	.pipe(writableFileStream);

