const express = require('express');
const hbs = require('hbs');
const yargs = require('yargs');
const axios = require('axios');

var app = express();
var port = process.env.PORT || 3000;
var argv = yargs.options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'address to fetch weather for',
            string: true // always parse address argument to ensure to get data
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
const key = 'cb8f7c729be5391ec2ba20624a4e8ce4';

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
}).then( (response) => {
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


// set index to root
app.set('views', './');
app.set('views engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs', {
    
    })
});

app.listen(port, function() {
    console.log(`App listening on port ${port}!`);
});

module.exports = app;