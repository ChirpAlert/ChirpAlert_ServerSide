var express = require('express'),
  router = express.Router(),
  db_api = require('./db_api'),
  http = require('http');


router.get('/birds', function(request, response) {
  // var queryString1 = "http://phylopic.org/api/a/name/search?text="+ birdData.recordings[0].gen + "+" + birdData.recordings[0].sp;
  var queryString1 = "http://phylopic.org/api/a/name/search?text=tinamus+tao";
  var queryString2 = "http://phylopic.org/api/a/name/";
  var result1 = '';
  http.get(queryString1, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var birdId = JSON.parse(body);
      birdId = birdId.result[0].canonicalName.uid;
      result1 = birdId;
      http.get(queryString2 + birdId + '/images', function(res) {
        console.log(birdId);
        var body = '';
        res.on('data', function(chunk2) {
          console.log('2nd call');
          body += chunk2;
        });
        res.on('end', function() {
          console.log(body);
          var picId = JSON.parse(body);
          picId = picId.result.supertaxa[0].uid;
          console.log(picId);
        });
      });
    });
  });
  console.log(result1);
});

module.exports = router;
