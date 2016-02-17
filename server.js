var Express = require('express')
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , session = require('express-session')
  , PORT = process.env.PORT || '3000'
	, jwt = require('jsonwebtoken')
  , routes = require('./routes/router');
  
require('dotenv').config();

passport.use('twitterLogin', new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  function(token, tokenSecret, profile, done) {
		findUser(profile.id).then(function(user){
    	return done(null, user);
		});
  }
));

passport.serializeUser(function(user, done) {
 done(null, user);
});
passport.deserializeUser(function(obj, done) {
 done(null, obj);
});

function findUser (profile_id) {
	return new Promise(function(resolve, reject) {
		//placeholder, query db for real thing
		resolve(profile_id);
	});
}

var server = Express();

server.use(passport.initialize());
server.use(passport.session());
server.use('/', routes);

server.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'big butts' 
}));


function isAuthenticated(request, response, next) {
	jwt.verify(request.headers.authorization.split(' ')[1], 'big butts', function(err, decoded){
 		if (err) {
			console.log(err);
		} else {
			request.user = {
				id: decoded.user
			};
	  	return next();
		}
  });
}

server.get('/login/twitter', passport.authenticate('twitterLogin')
);

// handle the callback after twitter has authenticated the user
server.get('/auth/callback',
	  passport.authenticate('twitterLogin', {failureRedirect : '/'}),
	  function(request, response){
		var user = request.session.passport;
		var token = jwt.sign(user, 'big butts');
		console.log('sent token: ' + token);
    response.redirect('chirpalert://&token=' + token);
  }
);

server.get('/test', isAuthenticated, function(request, response) {
	console.log('authenticated, hello user ' + request.user.id + '!');
	response.send('hi');
});

server.listen(PORT, function(){
  console.log('listening');
});
