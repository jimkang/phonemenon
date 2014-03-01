var through2 = require('through2');

var settings = {
  dictCommentMarker: ';;;',
  streamOptions: {
    flags: 'r',
    encoding: 'utf8'
  }
};

var textToPhonemeStream = through2({
    objectMode: true
  },
  function lineToPhoneme(chunk, enc, callback) {
    this.push(annotateLine(chunk));
    callback();
  }
);

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

module.exports = {textToPhonemeStream: textToPhonemeStream};
