$(function() {
    
    $('form').bind('submit', getLocation);
    
    function getLocation(e) {
        e.preventDefault();

        var location = $("#search_weather").val()

        // var location = $('#search_weather').val();
        $.get('api/location/?location=' + location, displayLocation);
    }
    
    function displayLocation(weather) {
    	console.log(weather);
        $('.location').html(weather.location);
        $('#temperature').html(weather.weather.temperature);
        $('#summary').html(weather.weather.summary);
        $('#apparentTemperature').html(weather.weather.apparentTemperature);
        $('#hourlySummary').html(weather.weather.hourlySummary);
    }
});
