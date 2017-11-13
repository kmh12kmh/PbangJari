var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var index = require('./routes/index');
var users = require('./routes/users');
var pcbang = require('./routes/pcbang');
var ceo = require('./routes/ceo');
var pcmap = require('./routes/pcmap');
var functions = require('./routes/functions')

var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pbangjari_mongodb');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log('connected to mongodb server');
});

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', users);
app.use('/api', pcbang);
app.use('/api', ceo);
app.use('/api', pcmap);
app.use('/api', functions);
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

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
//플래시메세지를 사용한다면
var flash = require('connect-flash');
app.use(flash());



module.exports = app;
