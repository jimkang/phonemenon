// It's a stream that analyzes phoneme groups you write to it, then returns the 
// analysis via the callback when the end is reached.

var Writable = require('stream').Writable;
var util = require('util');
var _ = require('lodash');

util.inherits(AnalyzePhonemeFollowerStream, Writable);

function AnalyzePhonemeFollowerStream(opts) {
  Writable.call(this, opts);

  // Must use object mode.
  if (!opts.objectMode) {
    opts.objectMode = true;
  }

  this.opts = opts;
  this.followerFreqsForPhonemes = {};
}

AnalyzePhonemeFollowerStream.prototype._write = function(group, encoding, 
  callback) {

  this.recordPhonemeFollowFrequencies(group);
  callback();
};

AnalyzePhonemeFollowerStream.prototype.end = function end(callback) {
  if (this.opts.done) {
    this.opts.done(null, this.followerFreqsForPhonemes);
  }
};

// Incoming phoneme groups will look like this:
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
//  
// }
// 
// With optional syllables property.

AnalyzePhonemeFollowerStream.prototype.recordPhonemeFollowFrequencies = 
function recordPhonemeFollowFrequencies(group) {
  var previousPhoneme = null;
  var phonemeSequence = _.pluck(group.phonemes, 'phoneme');

  for (var i = 0; i < phonemeSequence.length; ++i) {
    var phoneme = phonemeSequence[i];
    if (previousPhoneme) {
      var freqs = {};
      if (previousPhoneme in this.followerFreqsForPhonemes) {
        freqs = this.followerFreqsForPhonemes[previousPhoneme];
      }
      else {
        this.followerFreqsForPhonemes[previousPhoneme] = freqs;
      }

      var frequency = 0;
      if (phoneme in freqs) {
        frequency = freqs[phoneme];
      }
      frequency += 1;
      freqs[phoneme] = frequency;
    }
    previousPhoneme = phoneme;
  }
};


module.exports = AnalyzePhonemeFollowerStream;
