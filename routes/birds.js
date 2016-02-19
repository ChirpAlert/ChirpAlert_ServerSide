var express = require('express'),
  router = express.Router(),
  db_api = require('./db_api'),
  http = require('http'),
  bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json());
var jsonParser = bodyParser.json();
router.post('/birds', jsonParser, function(request, response) {
  console.log(request.body);
  var gen = request.body.gen;
  var sp = request.body.sp;
  var queryString1 = "http://phylopic.org/api/a/name/search?text=" + gen + "+" + sp;
  console.log('querying ' + queryString1);
  var queryString2 = "http://phylopic.org/api/a/name/";
  var phylopic = 'http://phylopic.org/assets/images/submissions/';
  http.get(queryString1, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      var birdId = JSON.parse(body);
			if (birdId.result.length > 0) {
	      birdId = birdId.result[0].canonicalName.uid;
	      http.get(queryString2 + birdId + '/images', function(res) {
	        var body = '';
	        res.on('data', function(chunk2) {
	          body += chunk2;
 	      	});
       		res.on('end', function() {
         		var picId = JSON.parse(body);
          	console.log(picId);
						for (var i in picId.result) {
							if (picId.result[i].length > 0)	{
          			picId = picId.result[i][0].uid;
								break;
							}
						}
         		phylopic = phylopic + picId + '.thumb.png';
         		response.send(phylopic);
        	});
      	});
			} else {
				response.send('nope');
			}
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
