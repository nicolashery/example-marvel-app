module.exports = function(req, res, next) {
  req.templateGlobals = {
    path: req.path,
    staticPath: req.staticPath
  };

  next();
};
