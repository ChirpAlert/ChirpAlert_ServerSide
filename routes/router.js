var express = require('express'),
  router = express.Router(),
  db_api = require('./db_api')

router.get('/adduser', function(request, response) {
  db_api.addUser('billy')
    .error(function(err){console.log(err)})
    .success(function(doc){
      console.log(doc)
    });
  response.end();
});

router.get('/savebird', function(request, response) {
  db_api.saveBird(newbird)
    .error(function(err){console.log(err)})
    .success(function(doc){
      console.log(doc)
    });
  response.end();
});

router.get('/getbirdlist', function(request, response) {
  db_api.getBirdList('billy')
    .error(function(err){console.log(err)})
    .success(function(doc){
      console.log(doc)
    });
  response.end();
});

//the console log here tells you how many docs were removed
router.get('/deletebird', function(request, response) {
  db_api.deleteBird(newbird)
    .error(function(err){console.log(err)})
    .success(function(doc){
      console.log(doc)
    });
  response.end();
});

var newbird = {
  twitterId: 'bestbird',
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
