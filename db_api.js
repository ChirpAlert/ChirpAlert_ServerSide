var db = require('monk')(process.env.MONGOLAB_URI);
var bson = require('bson');
require('dotenv').config();


var users = db.get('users');

users.insert({id: 'id'});

console.log('in the db file');

db.close();
