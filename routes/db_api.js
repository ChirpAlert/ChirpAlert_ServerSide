//var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
//var url = process.env.MONGOLAB_URI;
//var ObjectId = require('mongodb').ObjectID;

//MongoClient.connect(url, function(err, db){
//  assert.equal(null, err);
//  console.log("Connected correctly to server.");
//
//});
//var users = db.get('users');
//var savedBirds = db.get('savedBirds');

module.exports = {
  addUser: function(twitterId, users) {
    return function(db, callback){
      console.log('in db api');
      users.insertOne({
        id: twitterId
      }, function(err, result){
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback(); 
      });
    };
  },
  findUser: function(twitterId){
    return users.find({
      id: twitterId
    });
  },
  saveBird: function(birdObj) {
    return savedBirds.insert({
      user: birdObj.twitterId,
      bird: {
        id: birdObj.bird.id,
        name: birdObj.bird.englishName,
        loc: birdObj.bird.loc,
        time: birdObj.bird.timeSaved,
        image: birdObj.bird.imageUrl,
        audio: birdObj.bird.audioUrl
      }
    });
  },
  getBirdList: function(twitterId) {
    return savedBirds.find({
      user: twitterId
    });
  },
  deleteBird: function(birdObj) {
    return savedBirds.remove({
      user: birdObj.twitterId,
         id: birdObj.id
    });
  }
};

