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

var count = 0;

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.pipe(split()).on('data', function processLine(line) {
  ++count;
  if (count > 100) {
    process.stdin.destroy();
  }
  else {
    if (line.indexOf(settings.dictCommentMarker) !== 0) {
      console.log(annotateLine(line));
    }
  }
});

process.stdin.on('end', function stdinEnded() {
  console.log('Done.');
});

function annotateLine(line) {
  var wordAndPhonemes = line.split('  ');
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
