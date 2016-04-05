var t = require('tcomb');

var Url = require('app/models/url');
var Image = require('app/models/image');

var Character = t.struct({
  id: t.Number,
  name: t.String,
  description: t.String,
  modified: t.String,
  resourceURI: t.String,
  urls: t.list(Url),
  thumbnail: Image,
  comics: t.Object,
  stories: t.Object,
  events: t.Object,
  series: t.Object
}, 'Character');

Character.getPortraitXLarge = function(character) {
  return Image.getPortraitXLarge(character.thumbnail);
};

Character.getMarvelUrl = function(character) {
  return character.urls.find(function(url) {
    return url.type === 'detail';
  })[0];
};

Character.hasComics = function(character) {
  return character.comics.available > 0;
};

Character.getComics = function(character) {
  return character.comics.items;
};

module.exports = Character;
