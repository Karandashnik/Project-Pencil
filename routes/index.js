var express = require('express');
var router = express.Router();
var orch = require('orchestrate');
var config = {};
if (process.env.HEROKU) {
	config.dbKey = process.env.DBKEY;
} else {
	config = require('../config');
}
var passport = require('passport');
var LocalStrategy = require('passport-local');
var FacebookStrategy = require('passport-facebook');
var db = orch(config.dbKey);

//===============ROUTES=================
//displays our homepage
router.get('/', function(req, res){
  res.render('main', {user: req.user});
	console.log('BANANA', req);
});

router.get('/ourStory', function(req, res){
	res.render('ourStory', {user: req.user});
});
//
// router.get('/', function(req, res) {
// 	res.render('/');
// });
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
  console.log("WHY THE FUCK AM I POSTING THIS???");
  db.post('days',req.body)
  .then(function (result) {
    var id = result.path.key;
    res.send({id: id});
  })
});

router.put('/days/:id', function(req, res, next) {
  console.log("OMG YESSSSS");
  db.put('days', req.params.id, req.body)
  .then(function (result) {
    console.log(result);
    res.send({});
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
});

router.delete('/days/:id', function(req, res, next) {
  db.remove('days', req.params.id, true)
  .then(function (result) {
    res.send({});
  })
});
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
  db.put('kids', req.params.id, req.body).then(function (result) {
    //this isn't the RIGHT way to do it, but works for now...shouldn't have to return kid object
    db.get("kids", result.path.key).then(function (kid) {
      res.send(kid.body);
    });
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

router.delete('/kids/:id', function(req, res, next) {
  db.remove('kids', req.params.id, true)
  .then(function (result) {
    res.send({});
  })
});

//===============================================
//                 booking routes
//===============================================
  router.post('/bookings', function(req, res, next){
    db.post('bookings',req.body)
    .then(function (result) {
      var id =result.path.key;
      res.send({id: id});
    })
  });

  router.put('/bookings/:id', function(req,res,next) {
    db.put('bookings', req.params.id, req.body).then(function (result) {
      //this isn't the RIGHT way to do it, but works for now...shouldn't have to return booking object
      db.get('bookings', result.path.key).then(function(booking) {
        res.send(booking.body);
      });
    });
  });

  router.get('/bookings', function(req, res, next){
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

  router.delete('/bookings/:id', function(req, res, next) {
    db.remove('bookings', req.params.id, true)
    .then(function (result) {
      res.send(result.body);
    })
  });

module.exports = router;
