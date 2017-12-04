var express = require('express');
var router = express.Router();
var axios = require('axios');
var Location = require('../../models/Location');

router.get('/', function(req, res) {
	Location(loc).getLocation
		.then(location => {
			res.send(location)
		})
		.catch(function(error) {
			console.log(error.message);
		});
})

module.exports = router;

