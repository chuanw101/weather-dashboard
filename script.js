var apiKey = "b19a326e95573b97fb07965960f44846";

function getWeather(event) {
    event.preventDefault();
    var city = $("#cityName").val();
    console.log(city);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${apiKey}`) //this fetch allows city name, so we can lat/lon for onecall fetch
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)
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