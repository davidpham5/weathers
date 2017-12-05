$(function() {
    
    $('form').bind('submit', getLocation);
    
    function getLocation(e) {
        e.preventDefault();

        var location = $("#search_weather").val()

        // var location = $('#search_weather').val();
        $.get('api/location/?location=' + location, displayLocation);
    }
    
    function displayLocation(response) {
    	console.log(response)
        $('.location').html(response.location);
        $('#temperature').html(response.weather.temperature);
        $('#summary').html(response.weather.summary);
        $('#apparentTemperature').html(response.weather.apparentTemperature);
        $('#hourlySummary').html(response.weather.hourlySummary);
    }
});
