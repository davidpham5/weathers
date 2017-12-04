var express = require('express');
var router = express.Router();
var Weather = require('./../models/Weather');
var Location = require('./../models/Location');

router.get('/', function(request, resp) {
    // search-weather needs to supply location
    if (!location) {
        var location = '';
    }
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
                console.log(error.message);
            });
    })
	.catch(function(error) {
		console.log(error.message);
    });
});


module.exports = router