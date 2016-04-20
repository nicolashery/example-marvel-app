var t = require('tcomb');

var Comic = require('app/models/comic');

var template = require('marko')
  .load(require.resolve('./template.marko'));

var Input = t.struct({
  comics: t.list(Comic)
}, 'Input');

module.exports = function render(input, out) {
  input = Input(input);

  template.render(input, out);
};
