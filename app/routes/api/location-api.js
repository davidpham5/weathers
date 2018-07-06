var express = require('express');
var router = express.Router();
var Weather = require('./../../models/Weather');
var Location = require('../../models/Location');

router.get('/', function(req, res) {
  var location = req.query.location
  new Location(location).getLocation()
    .then(loc => {
      Weather(location).getWeather.then((weather) => {
        res.send({
          weather: weather,
          location: loc
        })
      })
      .catch(function(error) {
        console.log(error.message);
      });
    })
    .catch(function(error) {
      console.log(error.message);
    });
})

module.exports = router;

