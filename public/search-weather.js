$(function() {
    
    $('form').bind('submit', getLocation);
    
    function getLocation(e) {
        e.preventDefault();
        var location = $('#search_weather').val();
        $.get('../app/modules/weatherAPI.js', displayWeather)
        return location;
    }
    
    function displayWeather() {

    }
});