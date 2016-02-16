var express = require('express')
  , router = express.Router()
  , db_api = require('./db_api')

router.get('/adduser', function(request, response){
  db_api.adduser;
  response.end();
});

router.get('/savebird', function(request, response){

});

router.get('/getbirdlist', function(request, response){

});

router.get('/deletebird', function(request, response){

});

module.exports = router;
