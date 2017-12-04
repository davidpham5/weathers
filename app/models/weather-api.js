const yargs = require('yargs');
const axios = require('axios');
const key = require('../../private/api-key');

var argv = yargs.options({
		a: {
			demand: false,
			alias: 'address',
			describe: 'address to fetch weather for',
			string: true // always parse address argument to ensure to get data
		}
	})
	.help()
	.alias('help', 'h')
	.argv;
	var location = '10219 Gardiner Ave';
var Location = function(location) {
	var self = this;
	var encodedAddress = encodeURIComponent(location);
	//var encodedAddress = encodeURIComponent(argv.address);
	var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
	
	self.getLocation = axios.get(geocodeURL).then( (response) => {
		// Automatically JSON.stringfy our address, Promises built-in
		var formattedAddress = response.data.results[0].formatted_address;		
		return formattedAddress;
		}).catch((error) => {
			console.log(error);
		});
	return self;
};

var Weather = function(location) {
	var self = this;
	var encodedAddress = encodeURIComponent(location);
	//var encodedAddress = encodeURIComponent(argv.address);
	var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

	self.getWeather = axios.get(geocodeURL).then((response) => {
			// headers, response.data, body
			
			if (response.data.status === 'ZERO_RESULTS') {
				throw new Error('Unable to find that address');
			}
			var lat = response.data.results[0].geometry.location.lat;
			var long = response.data.results[0].geometry.location.lng;
			var	weatherURL = `https://api.darksky.net/forecast/${key}/${lat},${long}`;
			
			return axios.get(weatherURL);
		}).catch((error) => {
			if (error.code === 'ENOTFOUND') {
				console.log('Unable to connect to google maps api');
			} else {
				console.log(error.message);
			}
		});
	return self;
}
// console.log(Weather('10219 Gardiner Ave').getWeather.then((response) => {
// 	console.log(response);
// }));

module.exports = {
	Location, 
	Weather
};

