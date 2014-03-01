var through2 = require('through2');

function createStream(opts) {
  if (opts) {
    var indentString = opts.indentString ? opts.indentString : null;
    var followupString = opts.followupString ? opts.followupString : '';
  }

  var stringifyThroughStream = through2({
      objectMode: true
    },
    function stringifyChunk(chunk, enc, callback) {
      this.push(JSON.stringify(chunk, null, indentString) + followupString);
      callback();
    }
  );

  return stringifyThroughStream;  
}

module.exports = {createStream: createStream};
