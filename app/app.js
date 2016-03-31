var express = require('express');
var app = express();

var marvel = require('./middlewares/marvel');
var router = require('./router');

app.use(marvel());
app.use(router);

module.exports = app;
