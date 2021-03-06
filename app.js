var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var $ = require('jquery');
global.jQuery = $;
//require('bootstrap');
var _ = require('underscore');
var Backbone = require('backbone');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook');
var fbConfig = {};
var config = {};
if (process.env.HEROKU) {
	config.dbKey = process.env.DBKEY;
  fbConfig.appSecret = process.env.FACEBOOK_SECRET;
  fbConfig.appID = process.env.FACEBOOK_APP_ID;
  fbConfig.callbackURL = process.env.CALLBACKURL;
} else {
	config = require('./config');
  fbConfig = require('./fb.js');
}
var funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/backbone', express.static(__dirname + '/node_modules/backbone'));
app.use('/underscore', express.static(__dirname + '/node_modules/underscore'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.use('/', routes);

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

//===============PASSPORT=================
// Use the LocalStrategy within Passport to login/”signin” users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

// Use the LocalStrategy within Passport to register/"signup" users.
passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    funct.localReg(username, password, email, firstName, lastName)
    .then(function (user) {
      //console.log("keys in users are " + Object.keys(user));
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log("Error is " + err.body);
    });
  }
));
//Facebook login
passport.use('facebook', new FacebookStrategy({
  clientID        : fbConfig.appID,
  clientSecret    : fbConfig.appSecret,
  callbackURL     : fbConfig.callbackURL,
  //passReqToCallback: true,
  profileFields: ['id', 'name', 'displayName', 'picture.type(large)', 'email']
},

  // facebook will send back the tokens and profile
  function(access_token, refresh_token, profile, done) {
    funct.fbAuth(profile, done);
}));

// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});


module.exports = app;
