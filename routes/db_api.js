require('dotenv').config();
var db = require('monk')(process.env.MONGOLAB_URI);
var bson = require('bson');

var users = db.get('users');
var savedBirds = db.get('savedBirds');

module.exports = {
  addUser: function(twitterId) {
    return users.insert({
      id: twitterId
    })
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
    })
  },
  getBirdList: function(twitterId) {
    return savedBirds.find({
      user: twitterId 
    })
  },
//need to add 2nd condition (bird id) to this delete
  deleteBird: function(birdObj) {
    return savedBirds.remove({
      user: birdObj.twitterId,
    })
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
