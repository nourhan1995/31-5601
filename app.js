var express = require('express');
var app = express();

app.use(express.static('public'));

app.use(require('./quotes.js'));

module.exports = app;
