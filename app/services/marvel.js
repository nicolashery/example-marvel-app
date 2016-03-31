var crypto = require('crypto');
var fetch = require('node-fetch');
var queryString = require('query-string');

function Marvel(options) {
  this.publicKey = options.publicKey || '';
  this.privateKey = options.privateKey || '';
}

Marvel.prototype.findAllCharacters = function(options) {
  var self = this;
  options = options || {};
  var ts = this._timestamp();
  var limit = typeof options.limit === 'number' ? options.limit : 20;
  var offset = typeof options.offset === 'number' ? options.offset : 0;

  var qs = queryString.stringify({
    ts: ts,
    apikey: this.publicKey,
    hash: this._createHash(ts),
    limit: limit,
    offset: offset
  });
  var url = 'http://gateway.marvel.com/v1/public/characters?' + qs;

  return fetch(url)
    .then(function(res) {
      if (res.status !== 200) {
        return self._handleError(res);
      }

      return res.json();
    });
};

Marvel.prototype._createHash = function(ts) {
  var content = ts + this.privateKey + this.publicKey;
  var hash = crypto.createHash('md5').update(content).digest('hex');

  return hash;
};

Marvel.prototype._timestamp = function() {
  return parseInt(Date.now() / 1000, 10);
};

Marvel.prototype._handleError = function(res) {
  return res.text()
    .then(function(bodyText) {
      var message = res.status + ' ' + res.statusText + ' ' + bodyText;
      throw new Error(message);
    });
};

module.exports = Marvel;
