var t = require('tcomb');

var Image = require('app/models/image');

var FeaturedCharacter = t.struct({
  id: t.Number,
  name: t.String,
  thumbnail: Image
}, 'FeaturedCharacter');

module.exports = FeaturedCharacter;
