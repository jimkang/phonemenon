var vowelishPhonemes = [
  'AA',
  'AE',
  'AH',
  'AO',
  'AW',
  'AY',
  'EH',
  'ER',
  'EY',
  'IH',
  'IY',
  'OW',
  'OY',
  'UH',
  'UW'
];

var consonantishPhonemes = [
  'B',
  'CH',
  'D',
  'DH',
  'F',
  'G',
  'HH',
  'JH',
  'K',
  'L',
  'M',
  'N',
  'NG',
  'P',
  'R',
  'S',
  'SH',
  'T',
  'TH',
  'V',
  'W',
  'Y',
  'Z',
  'ZH'
];

module.exports = {
  vowelish: vowelishPhonemes,
  consonantish: consonantishPhonemes,
  isConsonantish: function isConsonantish(phoneme) {
    return (-1 !== consonantishPhonemes.indexOf(phoneme));
  },
  isVowelish: function isVowelish(phoneme) {
    return (-1 !== vowelishPhonemes.indexOf(phoneme));
  }
};

