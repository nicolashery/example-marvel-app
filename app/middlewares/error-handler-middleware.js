var DEV = process.env.NODE_ENV !== 'production';

var errorTemplate = require('marko')
  .load(require.resolve('../views/pages/error.marko'));

module.exports = function(err, req, res, next) {
  if (DEV) {
    return next(err);
  }

  res.status(500);
  errorTemplate.render({
    message: err.message
  }, res);
};