var t = require('tcomb');

var template = require('marko')
  .load(require.resolve('./template.marko'));

var Input = t.struct({
  path: t.String
}, 'Input');

module.exports = function render(input, out) {
  input = Input(input);

  template.render(input, out);
};
