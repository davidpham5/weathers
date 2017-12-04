const express = require('express');
const hbs = require('hbs');

var app = express();
var port = process.env.PORT || 3000;

var {Weather, Location} = require('./models/weather-api.js');

var location = '10219 Gardiner Ave';

app.use(express.static('app'));

// set index to root
//app.set('views', './');
app.set('views engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
	var myLocation = Location(location).getLocation.then((loc) => {
		console.log(loc);
	});
	
	Weather(location).getWeather.then((response) => {
		
		var temperature = response.data.currently.temperature;
		var summary = response.data.currently.summary;
		var hourlySummary = response.data.hourly.summary;
		var apparentTemperature = response.data.currently.apparentTemperature;
		//var formatedAddress = response.data.results[0].formatted_address;
		
		res.render('index.hbs', {
			weather: {
				temperature: temperature,
				summary: summary,
				hourlySummary: hourlySummary,
				apparentTemperature: apparentTemperature
			},
			//location: formatedAddress
		})
		console.log(`It's currently ${temperature} ${summary}. It feels like ${apparentTemperature}. ${hourlySummary}`)
		return response.data;
	}).catch((error) => {
		console.log(error);
	});
	
});

app.listen(port, function() {
	console.log(`App listening on port ${port}!`);
});

module.exports = app;