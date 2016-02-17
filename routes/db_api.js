require('dotenv').config();
var db = require('monk')(process.env.MONGOLAB_URI);
var bson = require('bson');

var users = db.get('users');
var savedBirds = db.get('savedBirds');

module.exports = {
  addUser: function(twitterId) {
    console.log('in db api');
      users.insert({
        id: twitterId
      }).error(function(err){console.log(err)})
        .success(function(doc){
          console.log(doc);
          return doc;
        });
  },
  saveBird: function(birdObj) {
    console.log('saving bird');
    savedBirds.insert({
      user: birdObj.twitterId,
      bird: {
        id: birdObj.bird.id,
        name: birdObj.bird.englishName,
        loc: birdObj.bird.loc,
        time: birdObj.bird.timeSaved,
        image: birdObj.bird.imageUrl,
        audio: birdObj.bird.audioUrl
      }
    })
    .error(function(err){console.log(err)})
    .success(function(doc){
      console.log(doc);
    });
  },
  getBirdList: function(twitterId) {
    console.log('finding birds');
    savedBirds.find({
      user: twitterId 
    })
    .error(function(err){console.log(err)})
    .success(function(doc){
      console.log(doc);
    });
  },
//need to add 2nd condition (bird id) to this delete
  deleteBird: function(birdObj) {
    savedBirds.remove({
      user: birdObj.twitterId,
    })
    .error(function(err){console.log(err)})
    .success(function(doc){
      console.log(doc);
    });
  }
};

console.log('in the db file');

// db.close();


//save user => attach twitter id to user document

// save bird to list => {user: "twitterid", bird: {
// id: "id", name: "English name", loc: "location", time: "time", image: "imageurl", audio: "audiourl"
// }}

// getbirdList => get all documents associated with twitterid

// delete => delete bird by xeno-canto and twitterid
