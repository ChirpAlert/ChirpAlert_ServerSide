var express = require('express'),
  router = express.Router(),
  db_api = require('./db_api'),
  http = require('http');


router.get('/location', function(request, response){
  console.log(request.body);
  // http.request({host: ‘www.reddit.com’, path, ‘/.json’}, function (response){
  //      var data = ‘';
  //      response.on(‘data’, function(chunk) {
  //      data += chunk
  // })
  // response.on(‘end’, function() {
  //      res.json({data: JSON.parse(data)})
  // })
  // }).end()
  // })
});
