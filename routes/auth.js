var express = require('express')
  , router = express.Router()
  , passport = require('passport')
  , jwt = require('jsonwebtoken')
  , db_api = require('./db_api');

router.get('/login/twitter', passport.authenticate('twitterLogin')
);

// handle the callback after twitter has authenticated the user
router.get('/callback',
    passport.authenticate('twitterLogin', {failureRedirect : '/'}),
    function(request, response){
    var user = request.session.passport;
    var token = jwt.sign(user, 'big butts');
    console.log('sent token: ' + token);
    response.redirect('chirpalert://&token=' + token);
  }
);


module.exports = router;
