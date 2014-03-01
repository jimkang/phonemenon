// Usage:
// cat phoneme_list.txt | node phonemize-analyze-ff.js
var cmuTextToPhonemeStream = require('./cmu-text-to-phoneme');
var split = require('split');
var stringifyThrough = require('./stringify-through');
var AnalyzePhonemeFollowerStream = require('./followerfreq-analysis-stream');

var analysisStream = new AnalyzePhonemeFollowerStream({
	objectMode: true,
	done: function analysisDone(error, followerFreqsForPhonemes) {
		if (error) {
			console.log(error);
		}
		else {
			console.log(followerFreqsForPhonemes);
		}
	}
});

process.stdin.setEncoding('utf8');

process.stdin
	.pipe(split())
	.pipe(cmuTextToPhonemeStream)
	.pipe(analysisStream);

