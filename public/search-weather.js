$(function() {
    
    $('form').bind('submit', getLocation);
    
    function getLocation(e) {
        e.preventDefault();

        var location = $("#search_weather").val()

        $.get('api/location/?location=' + location, displayLocation);
    }
    
    function displayLocation(data) {
        var summary = data.weather.summary.toLowerCase();
        var hourlySummary = data.weather.hourlySummary.toLowerCase();
        var temp = Math.round(data.weather.temperature);
        var apparentTemp = Math.round(data.weather.apparentTemperature);
        $('.location').html(data.location);
        $('#temperature').html(`${temp} ${String.fromCharCode(176)}F`);
        $('#summary').html(summary);
        $('#apparentTemperature').html(`It feels like ${apparentTemp} ${String.fromCharCode(176)}F`);
        $('#hourlySummary').html(hourlySummary);
    }
});
