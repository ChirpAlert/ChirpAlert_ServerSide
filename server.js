var Express = require('express')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , session = require('express-session')
  , PORT = process.env.PORT || '3000'
  , db_api = require('./db_api')
  
require('dotenv').config();

passport.use('twitterLogin', new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  function(token, tokenSecret, profile, done) {
     return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(obj, done) {
 done(null, obj);
});

var server = Express();

server.use(session({secret: 'big butts', resave: false, saveUninitialized: true, cookie: {}}));

server.use(passport.initialize());
server.use(passport.session());

function sayhi(request, response, next){
  console.log('hit the server');
  return next();
}
function sayyo(request, response, next){
  console.log('hit the callback');
  return next();
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
}
server.get('/login/twitter', sayhi, passport.authenticate('twitterLogin')
);

// handle the callback after twitter has authenticated the user
server.get('/auth/callback',
  sayyo,
  passport.authenticate('twitterLogin', {failureRedirect : '/'}),
  function(request, response){
    response.redirect('chirpalert://&session=' + request.session.id);
  }
);

server.listen(PORT, function(){
  console.log('listening');
});
