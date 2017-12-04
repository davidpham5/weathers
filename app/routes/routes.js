var express = require('express');
var router = express.Router();
var Weather = require('./../models/Weather');
var Location = require('./../models/Location');

router.get('/', function(request, resp) {
    var location = 20902;
	Weather(location).getWeather.then(weather => {
		resp.render('index.hbs', {
			weather: weather
		})
	})
	.catch(function(error) {
		console.log(error);
    });
});


module.exports = router