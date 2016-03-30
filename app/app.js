var express = require('express');
var app = express();

var router = require('./router');

app.use(router);

module.exports = app;
