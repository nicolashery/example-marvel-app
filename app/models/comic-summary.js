var t = require('tcomb');

var ComicSummary = t.struct({
  resourceURI: t.String,
  name: t.String
}, 'ComicSummary');

ComicSummary.getId = function(comicSummary) {
  var match = comicSummary.resourceURI.match(/\/comics\/([0-9]+)/);
  if (match && match.length === 2) {
    return parseInt(match[1], 10);
  } else {
    return null;
  }
};

module.exports = ComicSummary;
