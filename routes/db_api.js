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
    }, function(err, doc) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log('in route');
      // return data;
    });
  },
  saveBird: function(birdObj) {
    return savedBirds.insert({
      user: twitterId,
      bird: {
        id: birdObj.id,
        name: birdObj.englishName,
        loc: birdObj.location,
        time: birdObj.timeSaved,
        image: birdObj.imageUrl,
        audio: birdObj.audioUrl
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
      bird: {
        id: birdObj.id
      }
    });
  }
};



users.insert({
  id: 'id'
});

console.log('in the db file');

// db.close();


//save user => attach twitter id to user document

// save bird to list => {user: "twitterid", bird: {
// id: "id", name: "English name", loc: "location", time: "time", image: "imageurl", audio: "audiourl"
// }}

// getbirdList => get all documents associated with twitterid

// delete => delete bird by xeno-canto and twitterid
