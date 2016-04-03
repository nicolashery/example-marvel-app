var path = require('path');
var express = require('express');
var app = express();

var marvel = require('./middlewares/marvel-middleware');
var errorHandler = require('./middlewares/error-handler-middleware');
var router = require('./router');

app.use(express.static(path.join(__dirname, './assets')));
app.use(marvel());
app.use(router);
app.use(errorHandler);

module.exports = app;
