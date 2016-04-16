var PageTitleHelpers = require('app/helpers/page-title');

var comicsTemplate = require('marko')
  .load(require.resolve('app/views/pages/comics/template.marko'));
var comicsContentTemplate = require('marko')
  .load(require.resolve('app/views/pages/comics/content.marko'));
var comicTemplate = require('marko')
  .load(require.resolve('app/views/pages/comic/template.marko'));
var comicContentTemplate = require('marko')
  .load(require.resolve('app/views/pages/comic/content.marko'));
var notFoundTemplate = require('marko')
  .load(require.resolve('app/views/pages/not-found/template.marko'));

exports.index = function(req, res, next) {
  var marvel = req.marvel;
  var spf = req.query.spf;
  var offset = req.query.offset;

  marvel.findAllComics({
    offset: offset
  })
  .then(function(result) {
    var pageTitle = PageTitleHelpers.makeTitle('Comics');
    var templateData = {
      $global: req.templateGlobals,
      pageTitle: pageTitle,
      pagination: result.pagination,
      comics: result.comics
    };

    if (spf === 'navigate') {
      return comicsContentTemplate.render(templateData, function(err, html) {
        if (err) {
          return next(err);
        }

        res.send({
          title: pageTitle,
          attr: {
            'spf-navbar-characters': {class: ''},
            'spf-navbar-comics': {class: 'active'}
          },
          body: {
            'spf-content': html
          }
        });
      });
    }

    comicsTemplate.render(templateData, res);
  })
  .catch(next);
};

exports.show = function(req, res, next) {
  var marvel = req.marvel;
  var id = req.params.id;
  var spf = req.query.spf;

  marvel.findComic(id)
  .then(function(result) {
    var pageTitle = PageTitleHelpers.makeTitle(result.comic.name);
    var templateData = {
      $global: req.templateGlobals,
      pageTitle: pageTitle,
      comic: result.comic
    };

    if (spf === 'navigate') {
      return comicContentTemplate.render(templateData, function(err, html) {
        if (err) {
          return next(err);
        }

        res.send({
          title: pageTitle,
          attr: {
            'spf-navbar-characters': {class: ''},
            'spf-navbar-comics': {class: 'active'}
          },
          body: {
            'spf-content': html
          }
        });
      });
    }

    comicTemplate.render(templateData, res);
  })
  .catch(function(err) {
    if (err.status === 404) {
      res.status(404);
      return notFoundTemplate.render({$global: req.templateGlobals}, res);
    }

    next(err);
  });
};
