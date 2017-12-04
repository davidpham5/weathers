var express = require('express');
var router = express.Router();
var axios = require('axios');
var Weather = require('../../models/Weather');

router.get('/', function(req, res) {
    var location = 20902;
    Weather(location).getWeather
        .then(weather => {
		    res.send(weather)
    	})
	    .catch(function(error) {
		    console.log(error);
        });
})

module.exports = router;

