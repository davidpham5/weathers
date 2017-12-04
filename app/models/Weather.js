const axios = require('axios');
const key = require('../../private/api-key');

var location = '10219 Gardiner Ave';

var Weather = function(location) {
	var self = this;
	var encodedAddress = encodeURIComponent(location);
	//var encodedAddress = encodeURIComponent(argv.address);
	var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

	self.getWeather = axios.get(geocodeURL)
		.then((response) => {
			// headers, response.data, body
			
			if (response.data.status === 'ZERO_RESULTS') {
				throw new Error('Unable to find that address');
			}
			var lat = response.data.results[0].geometry.location.lat;
			var long = response.data.results[0].geometry.location.lng;
			var	weatherURL = `https://api.darksky.net/forecast/${key}/${lat},${long}`;
			
			return axios.get(weatherURL);
		})
		.then((response) => {
			var weather = {
				summary: response.data.currently.summary,
				hourlySummary: response.data.hourly.summary,
				apparentTemperature: response.data.currently.apparentTemperature,
				temperature: response.data.currently.temperature
			}
			return weather;
		})
		.catch((error) => {
			if (error.code === 'ENOTFOUND') {
				console.log('Unable to connect to google maps api');
			} else {
				console.log(error.message);
			}
		});
	return self;
}

module.exports = Weather;

