var t = require('tcomb');

var Image = require('app/models/image');

var FeaturedComic = t.struct({
  id: t.Number,
  name: t.String,
  thumbnail: Image
}, 'FeaturedComic');

module.exports = FeaturedComic;
