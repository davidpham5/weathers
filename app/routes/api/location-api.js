var express = require('express');
var router = express.Router();
var axios = require('axios');
var Location = require('../../models/Location');

router.get('/', function(req, res) {
    var loc = 20902;
    Location(loc).getLocation
        .then(location => {
		    res.send(location)
    	})
	    .catch(function(error) {
		    console.log(error);
        });
})

module.exports = router;

