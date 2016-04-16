var t = require('tcomb');

var CharacterSummary = require('app/models/character-summary');

var CharacterList = t.struct({
  available: t.Number,
  returned: t.Number,
  collectionURI: t.String,
  items: t.list(CharacterSummary)
}, 'CharacterList');

module.exports = CharacterList;
