// A stream that analyzes phoneme+syllable groups you write to it, then returns 
// the analysis, syllables by frequency and following frequency, via the 
// callback when the end is reached.

var Writable = require('stream').Writable;
var util = require('util');

util.inherits(AnalyzeSyllableStream, Writable);

function AnalyzeSyllableStream(opt) {
  Writable.call(this, opt);

  // Must use object mode.
  if (!opt.objectMode) {
    opt.objectMode = true;
  }

  this.opt = opt; 
  this.syllablesByFrequency = {};
}

AnalyzeSyllableStream.prototype._write = function(group, encoding, 
  callback) {

  this.recordSyllableFrequencies(group);
  callback();
};

AnalyzeSyllableStream.prototype.end = function end(callback) {
  if (this.opt.done) {
    this.opt.done(null, this.syllablesByFrequency);
  }
};

// Groups will look like this:
// {
//   "word": "ABALONE",
//   "phonemes": [
//     {
//       "phoneme": "AE",
//       "stress": 2
//     },
//     {
//       "phoneme": "B",
//       "stress": -1
//     },
//     {
//       "phoneme": "AH",
//       "stress": 0
//     },
//     {
//       "phoneme": "L",
//       "stress": -1
//     },
//     {
//       "phoneme": "OW",
//       "stress": 1
//     },
//     {
//       "phoneme": "N",
//       "stress": -1
//     },
//     {
//       "phoneme": "IY",
//       "stress": 0
//     }
//   ],
//   "syllables": [
//     [
//       "AE"
//     ],
//     [
//       "B",
//       "AH"
//     ],
//     [
//       "L",
//       "OW"
//     ],
//     [
//       "N",
//       "IY"
//     ]
//   ]
// }

AnalyzeSyllableStream.prototype.recordSyllableFrequencies = 
function recordSyllableFrequencies(group) {
  var previousSyllable = 'START';

  for (var i = 0; i < group.syllables.length; ++i) {
    var syllable = group.syllables[i].join('-');

    var freqs = {};
    if (previousSyllable in this.syllablesByFrequency) {
      freqs = this.syllablesByFrequency[previousSyllable];
    }
    else {
      this.syllablesByFrequency[previousSyllable] = freqs;
    }

    var frequency = 0;
    if (syllable in freqs) {
      frequency = freqs[syllable];
    }
    frequency += 1;
    freqs[syllable] = frequency;

    previousSyllable = syllable;
  }
};

module.exports = AnalyzeSyllableStream;
