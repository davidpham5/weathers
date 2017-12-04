var express = require('express');
var router = express.Router();
var Weather = require('./../models/Weather');
var Location = require('./../models/Location');

router.get('/', function(request, resp) {
    var location = 20902;
	Weather(location).getWeather.then(weather => {
        return weather;
    })
    .then((weather) => {
        Location(location).getLocation()
            .then((loc) => {
               resp.render('index.hbs', {
                    weather: weather,
                    location: loc
                })
            })
            .catch((error) => {
                console.log(error);
            });
    })
	.catch(function(error) {
		console.log(error);
    });
});


module.exports = router