var DEV = process.env.NODE_ENV !== 'production';

var errorTemplate = require('marko')
  .load(require.resolve('app/views/pages/error/template.marko'));

module.exports = function(err, req, res, next) {
  res.status(500);
  errorTemplate.render({
    $global: req.templateGlobals,
    stack: DEV ? err.stack : null,
    message: err.message
  }, res);

  next();
};
