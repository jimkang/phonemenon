// Usage:
// cat phoneme_list.txt | node phonemize-analyze-ff.js filename.txt [--make-module]
var cmuTextToPhonemeStream = require('./cmu-text-to-phoneme');
var split = require('split');
var AnalyzePhonemeFollowerStream = require('./followerfreq-analysis-stream');
var fs = require('fs');

var cmdOpts = require('nomnom')
  .option('makeModule', {
    full: 'make-module',
    flag: true,
    help: 'Make a module instead of a JSON file.'
  })
  .option('analytzeInSyllables', {
    metavar: '<behavior>',
    help: 'Analyze phoneme follower frequencies within syllables.',
    flag: true
  })
  .parse();

var analysisStream = new AnalyzePhonemeFollowerStream({
	objectMode: true,
	done: function analysisDone(error, followerFreqsForPhonemes) {
		if (error) {
			console.log(error);
		}
		else {
			// var writableFileStream = fs.createWriteStream(settings.outFilename, {
			//   flags: 'w',
			//   encoding: 'utf8',
			// });
			var outStream = process.stdout;

			if (cmdOpts.makeModule) {
				outStream.write('module.exports = ');
			}

			outStream.write(
				JSON.stringify(followerFreqsForPhonemes, null, '  '));

			if (cmdOpts.makeModule) {
				outStream.write(';\n');
			}
		}
	}
});

process.stdin.setEncoding('utf8');

process.stdin
	.pipe(split())
	.pipe(cmuTextToPhonemeStream)
	.pipe(analysisStream);

