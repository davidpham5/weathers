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
        $('.location').html(data.location);
        $('#temperature').html(`It's currently ${data.weather.temperature} degrees.`);
        $('#summary').html(`It's looks it is ${summary}.`);
        $('#apparentTemperature').html(`It feels like though, it is ${data.weather.apparentTemperature} degrees.`);
        $('#hourlySummary').html(`The next few hours looks like ${hourlySummary}`);
    }
});
