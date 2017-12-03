const express = require('express');
const hbs = require('hbs');

var app = express();
var port = process.env.PORT || 3000;

var getWeather = require('./models/weatherAPI.js');
getWeather();
app.use(express.static('app'));
// set index to root
//app.set('views', './');
app.set('views engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index.hbs', {
		
	})
});

app.listen(port, function() {
	console.log(`App listening on port ${port}!`);
});

module.exports = app;