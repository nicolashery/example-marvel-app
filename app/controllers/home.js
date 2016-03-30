var template = require('marko')
  .load(require.resolve('../views/pages/home.marko'));

exports.index = function(req, res) {
  template.render({}, res);
};
