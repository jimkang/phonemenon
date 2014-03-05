// Usage:
// cat phoneme_list.txt | node phoneme-syllable-analyze.js filename.txt [--make-module]
var split = require('split');
var cmuTextToPhonemeStream = require('./cmu-text-to-phoneme');
var syllablizeThrough = require('./syllablize-through');
var stringifyThrough = require('./stringify-through');
var AnalyzeSyllableStream = require('./syllablefreq-analysis-stream');
var fs = require('fs');

var start = process.hrtime();

var settings = {
  outFilename: process.argv[2],
  outputAsModule: process.argv[3]
};  

var writableFileStream = fs.createWriteStream(settings.outFilename, {
  flags: 'w',
  encoding: 'utf8',
});

process.stdin.setEncoding('utf8');

var analysisStream = new AnalyzeSyllableStream({
  objectMode: true,
  done: function analysisDone(error, syllablesByFrequency) {
    if (error) {
      console.log(error);
    }
    else {
      var writableFileStream = fs.createWriteStream(settings.outFilename, {
        flags: 'w',
        encoding: 'utf8',
      });
      if ('--make-module' === settings.outputAsModule) {
        writableFileStream.write('module.exports = ');
      }

      writableFileStream.write(
        JSON.stringify(syllablesByFrequency, null, '  '));

      if ('--make-module' === settings.outputAsModule) {
        writableFileStream.write(';\n');
      }

      var elapsedTime = process.hrtime(start);
      console.log('Syllablizing and analyzing took %d seconds and %d nanoseconds', 
        elapsedTime[0], elapsedTime[1]);      
    }
  }
});

process.stdin
  .pipe(split())
  .pipe(cmuTextToPhonemeStream)
  .pipe(syllablizeThrough.createStream())
  .pipe(analysisStream);


