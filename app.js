var express = require('express');
var logger = require('morgan');
const bodyParser = require('body-parser')
require('./database')
const {ENV_MODE  } = require('./config')
const { MediaRouter } = require('./modules/index')
var app = express();
app.use(logger(ENV_MODE));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);app.use('/media/v1.0.0/',MediaRouter)

app.use(function(err, req, res, next) {
  console.error('err',err)
  res.status(400);
  res.json({error:err});
});

module.exports = app;
