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

function getWeather(location) {
	var encodedAddress = encodeURIComponent(location);
 	//var encodedAddress = encodeURIComponent(argv.address);
	var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
	// Automatically JSON.stringfy our address, Promises built-in
	axios.get(geocodeURL).then( (response) => {
		// headers, response.data, body
		if (response.data.status === 'ZERO_RESULTS') {
			throw new Error('Unable to find that address');
		}
		var lat = response.data.results[0].geometry.location.lat;
		var long = response.data.results[0].geometry.location.lng;
		var	weatherURL = `https://api.darksky.net/forecast/${key}/${lat},${long}`;
		console.log(response.data.results[0].formatted_address);
		
		return axios.get(weatherURL);
	}).then((response) => {
		//console.log(response.data);
		var temperature = response.data.currently.temperature;
		var summary = response.data.currently.summary;
		var hourlySummary = response.data.hourly.summary;
		var apparentTemperature = response.data.currently.apparentTemperature;
		
		console.log(`It's currently ${temperature} ${summary}. It feels like ${apparentTemperature}. ${hourlySummary}`)
	}).catch((error) => {
		if (error.code === 'ENOTFOUND') {
			console.log('Unable to connect to google maps api');
		} else {
			console.log(error.message);
		}
	});
}

module.exports = getWeather;

