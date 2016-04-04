var path = require('path');
var express = require('express');
var compression = require('compression');
var morgan = require('morgan');

var marvel = require('./middlewares/marvel-middleware');
var staticPath = require('./middlewares/static-path-middleware');
var templateGlobals = require('./middlewares/template-globals-middleware');
var errorHandler = require('./middlewares/error-handler-middleware');
var router = require('./router');

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
