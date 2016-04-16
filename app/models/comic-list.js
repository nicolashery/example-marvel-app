var t = require('tcomb');

var ComicSummary = require('app/models/comic-summary');

var ComicList = t.struct({
  available: t.Number,
  returned: t.Number,
  collectionURI: t.String,
  items: t.list(ComicSummary)
}, 'ComicList');

module.exports = ComicList;
