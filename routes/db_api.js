require('dotenv').config();
var db = require('monk')(process.env.MONGOLAB_URI);
var bson = require('bson');

var users = db.get('users');

users.insert({id: 'id'});

console.log('in the db file');

db.close();
