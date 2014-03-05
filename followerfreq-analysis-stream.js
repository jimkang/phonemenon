// It's a stream that analyzes phoneme groups you write to it, then returns the 
// analysis via the callback when the end is reached.

var Writable = require('stream').Writable;
var util = require('util');

util.inherits(AnalyzePhonemeFollowerStream, Writable);

function AnalyzePhonemeFollowerStream(opt) {
  Writable.call(this, opt);

  // Must use object mode.
  if (!opt.objectMode) {
    opt.objectMode = true;
  }

  this.opt = opt; 
  this.followerFreqsForPhonemes = {};
}

AnalyzePhonemeFollowerStream.prototype._write = function(group, encoding, 
  callback) {

  this.recordPhonemeFollowFrequencies(group);
  callback();
};

AnalyzePhonemeFollowerStream.prototype.end = function end(callback) {
  if (this.opt.done) {
    this.opt.done(null, this.followerFreqsForPhonemes);
  }
};

// Phoneme groups will look like this:
// {
//   "word": "ABALONE",
//   "phonemes": [
//     {"phoneme":"AE","stress":2},
//     {"phoneme":"B","stress":-1},
//     {"phoneme":"AH","stress":0},
//     {"phoneme":"L","stress":-1},
//     {"phoneme":"OW","stress":1},
//     {"phoneme":"N","stress":-1},
//     {"phoneme":"IY","stress":0}
//   ]
// }

AnalyzePhonemeFollowerStream.prototype.recordPhonemeFollowFrequencies = 
function recordPhonemeFollowFrequencies(group) {
  var previousPhoneme = null;
  for (var i = 0; i < group.phonemes.length; ++i) {
    var phonemeObject = group.phonemes[i];
    if (previousPhoneme) {
      var freqs = {};
      if (previousPhoneme in this.followerFreqsForPhonemes) {
        freqs = this.followerFreqsForPhonemes[previousPhoneme];
      }
      else {
        this.followerFreqsForPhonemes[previousPhoneme] = freqs;
      }

      var frequency = 0;
      if (phonemeObject.phoneme in freqs) {
        frequency = freqs[phonemeObject.phoneme];
      }
      frequency += 1;
      freqs[phonemeObject.phoneme] = frequency;
    }
    previousPhoneme = phonemeObject.phoneme;
  }
};


module.exports = AnalyzePhonemeFollowerStream;
