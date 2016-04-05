var path = require('path');
var express = require('express');
var compression = require('compression');
var morgan = require('morgan');

var marvel = require('app/middlewares/marvel-middleware');
var staticPath = require('app/middlewares/static-path-middleware');
var templateGlobals = require('app/middlewares/template-globals-middleware');
var errorHandler = require('app/middlewares/error-handler-middleware');
var router = require('app/router');

var app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, '../static')));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'short' : 'dev'));

app.use(marvel());
app.use(staticPath);
app.use(templateGlobals);
app.use(router);
app.use(errorHandler);

module.exports = app;
