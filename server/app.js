var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session")
var RedisStore = require("connect-redis")(session);
var index = require('./routes/index');
var api = require('./routes/api/index')
var client = require("./redis/client")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: "a secret key",
	cookie: {
		maxAge: 60*60*24*7*1000,
	},
    resave: false,
    saveUninitialized: false,
	store: new RedisStore({ client }),
}))

//set CORS headers
app.use(function(req, res, next) {
	res.append("Access-Control-Allow-Origin", "http://localhost:8080")
	res.append("Access-Control-Allow-Credentials", "true")
	res.append("Access-Control-Allow-Methods", "POST, OPTIONS, GET")
	res.append("Access-Control-Max-Age", "10000000")
	res.append("Access-Control-Allow-Headers", "x-requested-with,Content-Type")
	next()
})

app.use('/', index);
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
