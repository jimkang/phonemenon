// Usage:
// cat phoneme_list.txt | node phonemize-analyze-ff.js filename.txt [--make-module]
var cmuTextToPhonemeStream = require('./cmu-text-to-phoneme');
var split = require('split');
var createFollowerFreqAnalyzeStream = require('./followerfreq-analysis-stream');
var syllablizeThrough = require('./syllablize-through');
var fs = require('fs');

var cmdOpts = require('nomnom')
  .option('makeModule', {
    full: 'make-module',
    flag: true,
    help: 'Make a module instead of a JSON file.'
  })
  .option('analyzeInSyllables', {
  	full: 'analyze-in-syllables',
    metavar: '<behavior>',
    help: 'Analyze phoneme follower frequencies within syllables.',
    flag: true
  })
  .option('reverse', {
    full: 'reverse',
    metavar: '<behavior>',
    help: 'Analyze phoneme *precedent* frequencies.',
    flag: false
  })
  .parse();

var analysisStream = createFollowerFreqAnalyzeStream({
	objectMode: true,
	analyzeInSyllables: cmdOpts.analyzeInSyllables,
  reverse: cmdOpts.reverse,
	done: function analysisDone(error, followerFreqsForPhonemes) {
		if (error) {
			console.log(error);
		}
		else {
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


var stream = process.stdin
	.pipe(split())
	.pipe(cmuTextToPhonemeStream);

if (cmdOpts.analyzeInSyllables) {
	stream = stream.pipe(syllablizeThrough.createStream());
}

stream
	.pipe(analysisStream);
