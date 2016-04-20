var t = require('tcomb');

var Character = require('app/models/character');

var template = require('marko')
  .load(require.resolve('./template.marko'));

var Input = t.struct({
  characters: t.list(Character)
}, 'Input');

module.exports = function render(input, out) {
  input = Input(input);

  template.render(input, out);
};
