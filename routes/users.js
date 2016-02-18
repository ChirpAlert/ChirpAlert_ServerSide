var express = require('express'),
  router = express.Router(),
  db_api = require('./db_api'),
  jwt = require('jsonwebtoken');

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

router.get('/adduser', function(request, response) {
  db_api.addUser('billy')
    .error(function(err){console.log(err)})
    .success(function(doc){
      console.log(doc)
    });
  response.end();
});

router.post('/savebird', isAuthenticated, function(request, response) {
  console.log(request.body);
  var newBird = {
    twitterId: request.user.id,
    bird: {
      id: request.body.bird_id,
      englishName: request.body.en,
      loc: request.body.loc,
      timeSaved: request.body.date,
      imageUrl: request.body.uid
		}
  };
  db_api.saveBird(newBird)
    .error(function(err){
      console.log(err);
      response.end('failed to save');
    })
    .success(function(doc){
      console.log(doc);
      response.end('saved');
    });
});

router.get('/getbirdlist', isAuthenticated, function(request, response) {
  db_api.getBirdList(request.user.id)
    .error(function(err){
      console.log(err);
      response.end('failed to save');
    })
    .success(function(doc){
      response.send(doc);
    });
});

//the console log here tells you how many docs were removed
router.get('/deletebird', isAuthenticated, function(request, response) {
  db_api.deleteBird(newbird)
    .error(function(err){console.log(err)})
    .success(function(doc){
      console.log(doc);
    });
  response.end();
});

module.exports = router;
