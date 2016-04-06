var Character = require('app/models/character');
var Image = require('app/models/image');

var template = require('marko')
  .load(require.resolve('./template.marko'));

module.exports = function render(input, out) {
  template.render(Object.assign({}, input, {
    getPortraitXLarge: Image.getPortraitXLarge,
    getMarvelUrl: Character.getMarvelUrl,
    hasDescription: Character.hasDescription,
    hasComics: Character.hasComics,
    getComics: Character.getComics
  }), out);
};
