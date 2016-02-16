require('dotenv').config();
var db = require('monk')(process.env.MONGOLAB_URI);
var bson = require('bson');


var users = db.get('users');

users.insert({id: 'id'});

console.log('in the db file');

db.close();


//save user => attach twitter id to user document

// save bird to list => {user: "twitterid", bird: {
// id: "id", name: "English name", loc: "location", time: "time", image: "imageurl", audio: "audiourl"
// }}

// getbirdList => get all documents associated with twitterid

// delete => delete bird by xeno-canto and twitterid
