$(function() {
    
    $('form').bind('submit', getLocation);
    
    function getLocation(e) {
        e.preventDefault();
        var location = $('#search_weather').val();
        $.get('./app/routes/api/weather-api.js', displayWeather)
        return location;
    }
    
    function displayWeather() {

    }
});