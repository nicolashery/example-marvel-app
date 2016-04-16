var t = require('tcomb');

var CharacterSummary = t.struct({
  resourceURI: t.String,
  name: t.String,
  role: t.maybe(t.String)
}, 'CharacterSummary');

CharacterSummary.getId = function(characterSummary) {
  var match = characterSummary.resourceURI.match(/\/characters\/([0-9]+)/);
  if (match && match.length === 2) {
    return parseInt(match[1], 10);
  } else {
    return null;
  }
};

module.exports = CharacterSummary;
