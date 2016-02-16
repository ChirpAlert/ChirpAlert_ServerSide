var db = require('monk')('localhost/chirpalert');
var bson = require('bson');

var users = db.get('users');

users.insert({id: 'id'});

console.log('in the db file');

db.close();
