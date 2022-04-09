var apiKey = "b19a326e95573b97fb07965960f44846";
var city = "seattle";

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${apiKey}`)
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