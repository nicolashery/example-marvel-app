var charatersTemplate = require('marko')
  .load(require.resolve('../views/pages/characters.marko'));
var errorTemplate = require('marko')
  .load(require.resolve('../views/pages/error.marko'));

exports.index = function(req, res) {
  var marvel = req.marvel;

  marvel.findAllCharacters()
  .then(function(body) {
    charatersTemplate.render({
      path: req.path,
      characters: body.data.results,
      attributionText: body.attributionText
    }, res);
  }, function(err) {
    res.status(500);
    errorTemplate.render({
      message: err.message
    }, res);
  });
};
