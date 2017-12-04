const express = require('express');
const hbs = require('hbs');

var app = express();
var port = process.env.PORT || 3000;

var Weather = require('./models/Weather');
var Location = require('./models/Location');

app.use(express.static('app'));

// set index to root
// app.set('views', './');
app.set('views engine', 'hbs');
app.use(express.static('public'));
app.use('/', require('./routes/routes'));
app.use('/api/location', require('./routes/api/location-api'));
app.use('/api/weather', require('./routes/api/weather-api'));

app.listen(port, function() {
	console.log(`App listening on port ${port}!`);
});

module.exports = app;