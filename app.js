var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./database')
const mediaRouter = require('./handlers/index')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/media/v1.0.0/',mediaRouter)

app.use(function(err, req, res, next) {
  console.error('err',err)
  res.status(400);
  res.json({error:err});
});

module.exports = app;
