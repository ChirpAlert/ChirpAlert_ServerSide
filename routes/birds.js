var express = require('express'),
  router = express.Router(),
  db_api = require('./db_api'),
  http = require('http'),
  bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json());
var jsonParser = bodyParser.json();
router.post('/birds', jsonParser, function(request, response) {
  var gen = request.body.gen
  var species = request.body.species
  var queryString1 = "http://phylopic.org/api/a/name/search?text=" + gen + "+" + species;
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
          console.log(picId);
          picId = picId.result.supertaxa[0].uid;
          phylopic = phylopic + picId + '.128.png';
          response.send(phylopic);
        });
      });
    });
  });
});

router.get('/bird/:id', function(request, response){
  var queryString = "http://www.xeno-canto.org/api/2/recordings?query=nr:" + request.params.id;
  http.get(queryString, function(res){
    var body = '';
    res.on('data', function(chunk){
      body += chunk;
    });
    res.on('end', function(){
      var singleBirdData = JSON.parse(body);
      singleBirdData = singleBirdData.recordings[0];
      console.log(singleBirdData);
      response.json(singleBirdData);
    });
  });
});

module.exports = router;
