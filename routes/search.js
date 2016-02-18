var express = require('express'),
  router = express.Router(),
  db_api = require('./db_api'),
  http = require('http');

router.post('/location', function(request, response){
	var lat = request.body.latitude.toFixed(3);
	var lon = request.body.longitude.toFixed(2);
	var queryString = 'http://www.xeno-canto.org/api/2/recordings?query=box:' + (lat - 0.2) + ',' + (lon - 0.2) + ',' + (Number(lat) + 0.2) + ',' + (Number(lon) + 0.2);
	console.log(queryString);
	http.get(queryString, function(res) {
		var birds = '';
		res.on('data', function(chunk){
			birds += chunk;
		});
		res.on('end', function() {
			var birdData = JSON.parse(birds);
			var birdsToSend = [];
			for (var i in birdData.recordings) {
				if (!birdsToSend.find(function(bird) {
					if (bird.en === birdData.recordings[i].en) {
						return true;
					}
				})) {
					birdsToSend.push(birdData.recordings[i]);
					console.log(birdData.recordings[i].en);
				}
			}
			console.log(birdsToSend.length);
			response.json(birdsToSend.recordings);
		});
	});
});

module.exports = router;
