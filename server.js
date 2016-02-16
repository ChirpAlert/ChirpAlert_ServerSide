var Express = require('express')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , session = require('express-session')
  , PORT = process.env.PORT || '3000'

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

server.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}));

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
    console.log('success redirect');
    response.redirect('chirpalert://?butt=butt')
  }
);


/* GET Twitter View Page */
server.get('/twitter', isAuthenticated, function(request, response){
  console.log('sending request.user!');
  response.json(request.user);
});

server.listen(PORT, function(){
  console.log('listening');
});
