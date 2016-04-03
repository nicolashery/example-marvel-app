var t = require('tcomb');

var Url = t.struct({
  type: t.String,
  url: t.String
}, 'Url');

module.exports = Url;
