// Usage:
// cat phoneme_list.txt | node phoneme.js

var split = require('split');

var settings = {
  dictCommentMarker: ';;;',
  streamOptions: {
    flags: 'r',
    encoding: 'utf8'
  }
};

function textToPhoneme(readStream, writeStream, limit) {
  var count = 0;

  this.readStream = readStream;
  this.writeStream = writeStream;

  readStream.resume();
  readStream.setEncoding('utf8');
  readStream.pipe(split()).on('data', processLine.bind(this));
  readStream.on('end', function readEnded() {
    console.log('Done.');
  });
}

function processLine(line) {
  ++this.count;
  if (this.limit && this.count > this.limit) {
    this.readStream.destroy();
  }
  else if (line.indexOf(settings.dictCommentMarker) !== 0) {
    if (line.length < 3) {
      console.log('Skipping empty line.');
      return;
    }
    this.writeStream.write(annotateLine(line));
  }
}

function annotateLine(line) {
  var wordAndPhonemes = line.split('  ');
  if (wordAndPhonemes.length < 2) {
    return {};
  }

  var phonemeStrings = wordAndPhonemes[1].split(' ');

  return {
    word: wordAndPhonemes[0],
    phonemes: phonemeStrings.map(parsePhonemeToken)
  };
}

function parsePhonemeToken(token, index) {
  var phoneme = token;
  var stress = -1;
  var lastCharPos = token.length - 1;
  if (lastCharPos > 0) {
    var lastCharAsNumber = +(token.charAt(lastCharPos));
    if (lastCharAsNumber > -1) {
      stress = lastCharAsNumber;
      phoneme = token.substring(0, lastCharPos);
    }
  }
  
  return {phoneme: phoneme, stress: stress};
}

module.exports = {textToPhoneme: textToPhoneme};
