$(function() {
    
    $('form').bind('submit', getLocation);
    
    function getLocation(e) {
        e.preventDefault();
        // var location = $('#search_weather').val();
        $.get('api/location-api.js', displayLocation);
    }
    
    function displayLocation(loc) {
        $('.location').html(loc);
    }
});