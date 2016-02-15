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
  //  console.log(token, tokenSecret, profile);
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

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
    // Return error content: res.jsonp(...) or redirect: res.redirect('/login')
}
//server.get('/login', function(request, response){
//  passport.authenticate('twitterLogin'); 
//});
//server.get('/auth/callback', function(request, response){
//  response.send('congratulations, ' + request.user + ' you are authenticated');
//})
server.get('/login/twitter',  
 passport.authenticate('twitterLogin')
);

// handle the callback after twitter has authenticated the user
server.get('/auth/callback',
  passport.authenticate('twitterLogin', {failureRedirect : '/'}), 
  function(request, response){
    response.redirect('/twitter')
  }
);


/* GET Twitter View Page */
server.get('/twitter', isAuthenticated, function(request, response){
//  response.send('congratulations, you are authenticated');
  response.json(request.user);
});

server.listen(PORT, function(){
  console.log('listening');
});
