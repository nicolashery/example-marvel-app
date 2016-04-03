var charactersTemplate = require('marko')
  .load(require.resolve('../views/pages/characters/template.marko'));
var charactersContentTemplate = require('marko')
  .load(require.resolve('../views/pages/characters/content.marko'));
var characterTemplate = require('marko')
  .load(require.resolve('../views/pages/character/template.marko'));
var characterContentTemplate = require('marko')
  .load(require.resolve('../views/pages/character/content.marko'));
var notFoundTemplate = require('marko')
  .load(require.resolve('../views/pages/not-found/template.marko'));

exports.index = function(req, res, next) {
  var marvel = req.marvel;
  var spf = req.query.spf;

  marvel.findAllCharacters()
  .then(function(body) {
    var pageTitle = 'Characters';
    var templateData = {
      pageTitle: pageTitle,
      path: req.path,
      characters: body.data.results,
      attributionText: body.attributionText
    };

    if (spf === 'navigate') {
      return charactersContentTemplate.render(templateData, function(err, html) {
        if (err) {
          return next(err);
        }

        res.send({
          title: pageTitle,
          attr: {
            'spf-navbar-characters': {class: 'active'}
          },
          body: {
            'spf-content': html
          }
        });
      });
    }

    charactersTemplate.render(templateData, res);
  }, next);
};

exports.show = function(req, res, next) {
  var marvel = req.marvel;
  var id = req.params.id;
  var spf = req.query.spf;

  marvel.findCharacter(id)
  .then(function(body) {
    var character = body.data.results[0];
    var pageTitle = character.name;
    var templateData = {
      path: req.path,
      pageTitle: pageTitle,
      character: character,
      attributionText: body.attributionText
    };

    if (spf === 'navigate') {
      return characterContentTemplate.render(templateData, function(err, html) {
        if (err) {
          return next(err);
        }

        res.send({
          title: pageTitle,
          attr: {
            'spf-navbar-characters': {class: 'active'}
          },
          body: {
            'spf-content': html
          }
        });
      });
    }

    characterTemplate.render(templateData, res);
  }, function(err) {
    if (err.status === 404) {
      res.status(404);
      return notFoundTemplate.render({path: req.path}, res);
    }

    next(err);
  });
};
