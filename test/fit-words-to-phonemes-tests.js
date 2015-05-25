var test = require('tape');

var fitWordsToPhonemes = require('../fit-words-to-phonemes');
// var seedrandom = require('seedrandom');

var testCases = [
  {
    phonemes: [ 'B', 'AO', 'B' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'B', 'AO', 'D' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'B', 'AO', 'G' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'B', 'AO', 'K' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'B', 'AO', 'P' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'B', 'AO', 'T' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'D', 'Z', 'AO', 'B' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'D', 'Z', 'AO', 'D' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'D', 'Z', 'AO', 'G' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'D', 'Z', 'AO', 'K' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'D', 'Z', 'AO', 'P' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'D', 'Z', 'AO', 'T' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'G', 'AO', 'B' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'G', 'AO', 'D' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'G', 'AO', 'G' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'G', 'AO', 'K' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'G', 'AO', 'P' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'G', 'AO', 'T' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'K', 'AO', 'B' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'K', 'AO', 'D' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'K', 'AO', 'G' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'K', 'AO', 'K' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'K', 'AO', 'P' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'K', 'AO', 'T' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'R', 'K', 'AO', 'B' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'R', 'K', 'AO', 'D' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'R', 'K', 'AO', 'G' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'R', 'K', 'AO', 'K' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'R', 'K', 'AO', 'P' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'R', 'K', 'AO', 'T' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'T', 'AO', 'B' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'T', 'AO', 'D' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'T', 'AO', 'G' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'T', 'AO', 'K' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'T', 'AO', 'P' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'T', 'AO', 'T' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'AO', 'B' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'AO', 'D' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'AO', 'G' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'AO', 'K' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'AO', 'P' ],
    expected: [
    ]
  },
  {
    phonemes: [ 'P', 'AO', 'T' ],
    expected: [
    ]
  },
];

testCases.forEach(runFitTest);

function runFitTest(testCase) {
  test('Fit word', function fitWordTest(t) {
    t.plan(1);

    var wordCombos = fitWordsToPhonemes({
      phonemes: testCase.phonemes,
      maxSyllables: 5
    });

    t.deepEqual(
      wordCombos,
      testCase.expected,
      'Gets the expected words for ' + testCase.phonemes.join('-')
    );
  });
}
