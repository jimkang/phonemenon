var Writable = require('stream').Writable;
var util = require('util');
util.inherits(JSONToStdoutStream, Writable);

function JSONToStdoutStream(opt) {
	if (!opt) {
		opt = {objectMode: true};
	}
  Writable.call(this, opt);
}

JSONToStdoutStream.prototype._write = function(chunk, encoding, callback) {
  process.stdout.write(JSON.stringify(chunk, null, '  '));
  callback();
};

module.exports = JSONToStdoutStream;
