// Usage:
// cat phoneme_list.txt | node phonemize-analyze-ff.js filename.txt [--make-module]
var cmuTextToPhonemeStream = require('./cmu-text-to-phoneme');
var split = require('split');
var AnalyzePhonemeFollowerStream = require('./followerfreq-analysis-stream');
var fs = require('fs');

var settings = {
  outFilename: process.argv[2]
};  


var analysisStream = new AnalyzePhonemeFollowerStream({
	objectMode: true,
	done: function analysisDone(error, followerFreqsForPhonemes) {
		if (error) {
			console.log(error);
		}
		else {
			var writableFileStream = fs.createWriteStream(settings.outFilename, {
			  flags: 'w',
			  encoding: 'utf8',
			});
			if ('--make-module' === process.argv[3]) {
				writableFileStream.write('module.exports = \n');
			}

			writableFileStream.write(
				JSON.stringify(followerFreqsForPhonemes, null, '  '));

			if ('--make-module' === process.argv[3]) {
				writableFileStream.write(';\n');
			}
		}
	}
});

process.stdin.setEncoding('utf8');

process.stdin
	.pipe(split())
	.pipe(cmuTextToPhonemeStream)
	.pipe(analysisStream);

