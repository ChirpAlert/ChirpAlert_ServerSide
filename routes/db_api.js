require('dotenv').config();
var db = require('monk')(process.env.MONGOLAB_URI);
var bson = require('bson');

var users = db.get('users');
var savedBirds = db.get('savedBirds');

module.exports = {
  addUser: function(twitterId) {
    return users.insert({
      id: twitterId
    });
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
        image: birdObj.bird.imageUrl
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

console.log('in the db file');
