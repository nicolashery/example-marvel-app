var t = require('tcomb');

var Comic = require('app/models/comic');
var Image = require('app/models/image');
var CharacterSummary = require('app/models/character-summary');

var template = require('marko')
  .load(require.resolve('./template.marko'));

var Input = t.struct({
  comic: Comic
}, 'Input');

module.exports = function render(input, out) {
  input = Input(input);

  template.render(Object.assign({}, input, {
    getPortraitXLarge: Image.getPortraitXLarge,
    getMarvelUrl: Comic.getMarvelUrl,
    hasDescription: Comic.hasDescription,
    hasCharacters: Comic.hasCharacters,
    getCharacters: Comic.getCharacters,
    getCharacterId: CharacterSummary.getId
  }), out);
};
