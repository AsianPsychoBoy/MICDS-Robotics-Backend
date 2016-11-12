'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./lib/config');
var jwt = require('express-jwt');
var unless = require('express-unless');

var routes = require('./routes/index');
var blogAPI = require('./routes/blogAPI');
var signInAPI = require('./routes/sign-inAPI');
var authAPI = require('./routes/authAPI');

var app = express();
app.locals.compileDebug = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Database connection
mongoose.connect('mongodb://robotics-client:getittogetherjack@45.56.70.141:27017/micds-robotics?3t.uriVersion=2&3t.connectionMode=direct&3t.databases=micds-robotics&readPreference=primary');
var db = mongoose.connection;
db.on('error', function() {console.log('connection error')});
db.once('open', function() {
	console.log('connected');
})


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jwt({
	secret: config.jwtSecret,
	getToken: function (req) {
		return req.cookies.jwt;
	}
}).unless({ path: ['/auth/login'] }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/blog', blogAPI);
app.use('/sign-in', signInAPI);
app.use('/auth', authAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
