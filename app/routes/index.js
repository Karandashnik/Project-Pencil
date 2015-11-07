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

//===============================================
//      login/register/authenticate routes
//===============================================
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

//===============================================
//              calendar routes
//===============================================
//route to go to org/calendar page
router.get('/calendar', function(req, res){
  res.render('calendar', {user: req.user});
});
//===============================================
//                kid routes
//===============================================
router.post('/kids', function(req, res, next){
  console.log("POSTING A KID!");
  db.post('kids',req.body);
});

router.get('/kids', function(req, res, next){
  db.search('kids', req.query.username)
  .then(function (result) {
    var kidResults = result.body.results;
    var kidArray = [];
    for (i=0; i<kidResults.length; i++){
      var individualKid = {
        id: kidResults[i].path.key,
        kidFirstName: kidResults[i].value.kidFirstName,
        kidLastName: kidResults[i].value.kidLastName,
        kidMidInitial: kidResults[i].value.kidMidInitial,
        username: kidResults[i].value.username
      }
      kidArray.push(individualKid);
    };
    res.send(kidArray);
  })
  .fail(function (err) {
    console.log(err);
  })
})

//===============================================
//                 booking routes
//===============================================
  router.post('/bookings', function(req, res, next){
    console.log("BOOKINGS POST IS WORKING");
    db.post('bookings',req.body);
  });


module.exports = router;
