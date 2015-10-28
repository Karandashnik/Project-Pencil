var express = require('express');
var router = express.Router();
var orch = require('orchestrate');
var config = require('../config');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook');
var db = orch(config.dbKey);

//===============ROUTES=================
//displays our homepage
router.get('/', function(req, res){
  res.render('main', {user: req.user});
});

//displays our signup page
router.get('/signin', function(req, res){
  res.render('login');
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

// route for facebook authentication and login
// different scopes while logging in
router.get('/auth/facebook',
  passport.authenticate('facebook', { scope : 'email' }
));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/signin'
  })
);

/* router.post('/', function(req, res, next) {

  //Intialize a variable to store active user
  var user;
  //Collect user input to match with DB data
  var username = req.body.username;
  var password = req.body.password;
  //Search the DB for a user matching inputs
  db.search("users", username)
  .then(function(result){
    //If a user was found...
    if(result.body.count > 0) {

      //Storing path to user info for convenience
      user = result.body.results[0].value
      //And if their username and password match DB's values, let 'em in
      if( (user.username === username || user.email === username) && user.password === password) {
        res.render('main', {user: user.username});
        router.user = user;
      } else res.render('login', {error: "We couldn't find that username and password in our records. Give it another shot."});
    //FOR TESTING PURPOSES: If no user was found, give our DB some users to work with!

  } else {
    db.post("users", {"username": "Harrison", "password": "123", "email": "harrisonccole@gmail.com"});
    res.render('login', {error: "We couldn't find that username and password in our records. Give it another shot."});
  }
  });

}); */



router.post('/october', function(req,res,next){
  db.post("october",req.body);
  console.log(req.body);
});


module.exports = router;
