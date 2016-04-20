var t = require('tcomb');

var FeaturedComic = require('app/models/featured-comic');
var Image = require('app/models/image');

var template = require('marko')
  .load(require.resolve('./template.marko'));

var Input = t.struct({
  comics: t.list(FeaturedComic)
}, 'Input');

module.exports = function render(input, out) {
  input = Input(input);

  template.render(Object.assign({}, input, {
    getStandardXLarge: Image.getStandardXLarge
  }), out);
};
