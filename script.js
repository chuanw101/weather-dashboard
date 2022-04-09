var apiKey = "b19a326e95573b97fb07965960f44846";

function getWeather(event) {
    event.preventDefault();
    var city = $("#cityName").val();
    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${apiKey}`) //this fetch allows city name, so we can lat/lon for onecall fetch
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)
            //fetch more detailed weather info now that we have the lat/lon
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                });
        });
}

$("#search").on('click', function(event){
    getWeather(event);
});