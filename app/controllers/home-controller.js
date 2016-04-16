var PageTitleHelpers = require('app/helpers/page-title');

var homeTemplate = require('marko')
  .load(require.resolve('app/views/pages/home/template.marko'));

exports.index = function(req, res) {
  var marvel = req.marvel;

  var charactersDataProvider = marvel.fetchFeaturedCharacters()
    .then(function(results) {
      return results.characters;
    })
    .catch(function() {
      return [];
    });

  var comicsDataProvider = marvel.fetchFeaturedComics()
    .then(function(results) {
      return results.comics;
    })
    .catch(function() {
      return [];
    });

  var templateData = {
    $global: req.templateGlobals,
    pageTitle: PageTitleHelpers.makeTitle(),
    charactersDataProvider: charactersDataProvider,
    comicsDataProvider: comicsDataProvider
  };

  homeTemplate.render(templateData, res);
};
