var express = require('express'),
  router = express.Router(),
  db_api = require('./db_api'),
  http = require('http');


router.get('/birds', function(request, response) {
  var queryString1 = "http://phylopic.org/api/a/name/search?text=tinamus+tao";
  var queryString2 = "http://phylopic.org/api/a/name/";
  var phylopic = 'http://phylopic.org/assets/images/submissions/';
  http.get(queryString1, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var birdId = JSON.parse(body);
      birdId = birdId.result[0].canonicalName.uid;
      http.get(queryString2 + birdId + '/images', function(res) {
        var body = '';
        res.on('data', function(chunk2) {
          body += chunk2;
        });
        res.on('end', function() {
          var picId = JSON.parse(body);
          picId = picId.result.supertaxa[0].uid;
          phylopic = phylopic + picId + '.512.png';
          response.send("<img src='" + phylopic + "' />");
        });
      });
    });
  });
});

module.exports = router;
