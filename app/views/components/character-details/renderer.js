var t = require('tcomb');

var Character = require('app/models/character');
var Image = require('app/models/image');
var ComicSummary = require('app/models/comic-summary');

var template = require('marko')
  .load(require.resolve('./template.marko'));

var Input = t.struct({
  character: Character
}, 'Input');

module.exports = function render(input, out) {
  input = Input(input);

  template.render(Object.assign({}, input, {
    getPortraitXLarge: Image.getPortraitXLarge,
    getMarvelUrl: Character.getMarvelUrl,
    hasDescription: Character.hasDescription,
    hasComics: Character.hasComics,
    getComics: Character.getComics,
    getComicId: ComicSummary.getId
  }), out);
};
