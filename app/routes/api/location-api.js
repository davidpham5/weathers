const axios = require('axios');

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

module.exports = Location;