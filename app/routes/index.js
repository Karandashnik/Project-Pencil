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

router.post('/days', function(req, res, next){
  db.post('days',req.body)
  .then(function (result) {
    var id = result.path.key;
    res.send({id: id});
  })
});

router.get('/days', function(req, res, next){
  db.search('days', req.query.user)
  .then(function (result) {
    var dayResults = result.body.results;
    var dayArray = [];
    for (i=0; i<dayResults.length; i++){
      var individualDay = {
        id: dayResults[i].path.key,
        date: dayResults[i].value.date,
        dateId: dayResults[i].value.dateId,
        user: dayResults[i].value.user,
        bookingCount: dayResults[i].value.bookingCount,
        bookings: dayResults[i].value.bookings
      }
      dayArray.push(individualDay);
    };
    res.send(dayArray);
  })
  .fail(function (err) {
    console.log(err);
  })
})
//===============================================
//                kid routes
//===============================================
router.post('/kids', function(req, res, next){
  db.post('kids',req.body)
  .then(function (result) {
    var id = result.path.key;
    res.send({id: id});
  })
});

router.put('/kids/:id', function(req,res,next) {
  db.put('kids', req.params.id, req.body)
  .then(function (result) {
    console.log("Kid was updated...");
    console.log(result.path);
    var id = result.path.key;
    res.send({id: id});
  })
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
        kidFullName: kidResults[i].value.kidFullName,
        username: kidResults[i].value.username
      }
      kidArray.push(individualKid);
    };
    res.send(kidArray);
  })
  .fail(function (err) {
    console.log(err);
  })
});

// // router.get('/kids', function(req, res, next) {
// //   db.newSearchBuilder()
// //   .collection('kids')
// // .sort(field_name, 'asc')  //asc for ascending order//
// // var editKid = what user entered
// // .query(editKid)
// // .then(function (res) {
// //  var change = result.body.results;
// //  console.log("this is the " + change);
// // });
//
// });

//===============================================
//                 booking routes
//===============================================
  router.post('/bookings', function(req, res, next){
    db.post('bookings',req.body)
    .then(function (result) {
      console.log("POSTING BOOKING!");
      var id =result.path.key;
      res.send({id: id});
    })
  });

  router.get('/bookings', function(req, res, next){
    console.log(req.query.user);
    db.search('bookings', req.query.user)
    .then(function (result) {
      var bookingResults = result.body.results;
      var bookingArray = [];
      for (i=0; i<bookingResults.length; i++){
        var individualBooking = {
          id: bookingResults[i].path.key,
          service: bookingResults[i].value.service,
          kid: bookingResults[i].value.kid,
          user: bookingResults[i].value.user,
          date: bookingResults[i].value.date,
          dateId: bookingResults[i].value.dateId
        }
        bookingArray.push(individualBooking);
      };
      res.send(bookingArray);
    })
    .fail(function (err) {
      console.log(err);
    })
  });

//===============================================
//                 dashboard routes
//===============================================



module.exports = router;
