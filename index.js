module.exports = {
  textToPhonemeStream: require('./cmu-text-to-phoneme'),
  createAnalyzeFollowerStream: require('./followerfreq-analysis-stream'),
  createStringifyThroughStream: require('./stringify-through'),
  AnalyzeSyllableStream: require('./syllablefreq-analysis-stream'),
  syllablizeThrough: require('./syllablize-through'),
  phonemeTypes: require('./phoneme-types')
};
