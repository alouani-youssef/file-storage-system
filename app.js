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
);
app.use(function corsAllow(req,res,next){
  res.header("Access-Control-Allow-Headers","*");
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,x-media-key, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
})
app.use('/media/v1.0.0/',MediaRouter)
app.use(function(err, req, res, next) {
  console.error('err',err)
  res.status(400);
  res.json({error:err});
});

module.exports = app;
