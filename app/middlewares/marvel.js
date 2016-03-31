var config = require('../../config');
var Marvel = require('../services/marvel');

module.exports = function() {
  var marvel = new Marvel({
    publicKey: config.MARVEL_PUBLIC_KEY,
    privateKey: config.MARVEL_PRIVATE_KEY
  });

  return function(req, res, next) {
    req.marvel = marvel;
    next();
  };
};