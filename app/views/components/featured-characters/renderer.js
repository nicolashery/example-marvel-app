var t = require('tcomb');

var FeaturedCharacter = require('app/models/featured-character');
var Image = require('app/models/image');

var template = require('marko')
  .load(require.resolve('./template.marko'));

var Input = t.struct({
  characters: t.list(FeaturedCharacter)
}, 'Input');

module.exports = function render(input, out) {
  input = Input(input);

  template.render(Object.assign({}, input, {
    getStandardXLarge: Image.getStandardXLarge
  }), out);
};
