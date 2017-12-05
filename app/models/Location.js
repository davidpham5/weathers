const axios = require('axios');

var Location = function(location) {
    var self = this;
    // var loc;
	var encodedAddress = encodeURIComponent(location);
	//var encodedAddress = encodeURIComponent(argv.address);
	var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
    
    // self.getLocation = function() { 
    //     return loc; 
    // };

	self.getLocation = function() {
        var promise = axios.get(geocodeURL)
            .then( (response) => {
                // Automatically JSON.stringfy our address, Promises built-in		
                return response.data.results[0].formatted_address;
            })
            .catch((error) => {
                console.log(error.message);
            });
        return promise;
    }
	return self;
};

module.exports = Location;