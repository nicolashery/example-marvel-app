var config = require('config/app');
var Marvel = require('app/services/marvel');

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
