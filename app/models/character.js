var t = require('tcomb');

var Url = require('app/models/url');
var Image = require('app/models/image');
var ComicList = require('app/models/comic-list');

var Character = t.struct({
  id: t.Number,
  name: t.String,
  description: t.maybe(t.String),
  modified: t.String,
  resourceURI: t.String,
  urls: t.list(Url),
  thumbnail: Image,
  comics: ComicList,
  stories: t.Object,
  events: t.Object,
  series: t.Object
}, 'Character');

Character.getMarvelUrl = function(character) {
  return character.urls.find(function(url) {
    return url.type === 'detail';
  }).url;
};

Character.hasDescription = function(character) {
  return (
    character.description &&
    character.description.length > 0
  );
};

Character.hasComics = function(character) {
  return character.comics.available > 0;
};

Character.getComics = function(character) {
  return character.comics.items;
};

module.exports = Character;
