var express = require('express'),
  router = express.Router(),
  db_api = require('./db_api')

router.get('/adduser', function(request, response) {
  db_api.addUser('last user');
  response.end();
});

router.get('/savebird', function(request, response) {
  db_api.saveBird(newbird);
  response.end();
});

router.get('/getbirdlist', function(request, response) {
  db_api.getBirdList('billy');
  response.end();
});

router.get('/deletebird', function(request, response) {
  db_api.deleteBird(newbird);
  response.end();
});

var newbird = {
  twitterId: 'jenn',
  bird: {
    id: 3,
    englishName: 'sparrow',
    loc: 'denver',
    timeSaved: 'this morning',
    imageUrl: 'google it', 
    audioUrl: 'google it'
  }
}

module.exports = router;
