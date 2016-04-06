var homeTemplate = require('marko')
  .load(require.resolve('app/views/pages/home/template.marko'));

exports.index = function(req, res, next) {
  var marvel = req.marvel;

  marvel.fetchFeaturedCharacters()
  .then(function(result) {
    var templateData = {
      $global: req.templateGlobals,
      pageTitle: 'Home',
      characters: result.characters
    };

    homeTemplate.render(templateData, res);
  })
  .catch(next);
};
