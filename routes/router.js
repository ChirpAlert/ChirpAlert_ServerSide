var express = require('express'),
  router = express.Router(),
  db_api = require('./db_api'),
  MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  url = process.env.MONGOLAB_URI,
  ObjectId = require('mongodb').ObjectID

router.get('/adduser', function(request, response) {
  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    //var insertdoc =  function(db, callback){
        db.collection('users').insert({
          id: '235'
        }, function(err, result){
          assert.equal(err, null);
          console.log("Inserted a document into the restaurants collection.");
        });
     // }
  //  insertdoc(db, function() {
  //  });
    db.close();
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
      console.log(doc);
    });
  response.end();
});

module.exports = router;
