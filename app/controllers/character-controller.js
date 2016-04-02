var charatersTemplate = require('marko')
  .load(require.resolve('../views/pages/characters.marko'));
var characterTemplate = require('marko')
  .load(require.resolve('../views/pages/character.marko'));
var notFoundTemplate = require('marko')
  .load(require.resolve('../views/pages/not-found.marko'));
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

exports.show = function(req, res) {
  var marvel = req.marvel;
  var id = req.params.id;

  marvel.findCharacter(id)
  .then(function(body) {
    characterTemplate.render({
      path: req.path,
      character: body.data.results[0],
      attributionText: body.attributionText
    }, res);
  }, function(err) {
    if (err.status === 404) {
      res.status(404);
      return notFoundTemplate.render({}, res);
    }

    res.status(500);
    errorTemplate.render({
      message: err.message
    }, res);
  });
};
