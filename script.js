var apiKey = "b19a326e95573b97fb07965960f44846";

function getWeather(event) {
    event.preventDefault();
    var city = $("#cityName").val();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${apiKey}`) //this fetch allows city name, so we can lat/lon for onecall fetch
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // update city name in html
            $(cityName).text(data.name);
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)
                //fetch more detailed weather info now that we have the lat/lon
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    // update all date fields in html
                    var allDates = $(".date");
                    for (let i = 0; i < allDates.length; i++) {
                        allDates.eq(i).text(moment.unix(data.daily[i].dt).format("MM/DD/YYYY"));
                    }

                    // update all wIcon field in html
                    var allIcons = $(".wIcon");
                    for (let i = 0; i < allIcons.length; i++) {
                        allIcons.eq(i).attr("src",`http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`);
                    }

                    // update all temp fields in html
                    var allTemp = $(".temp");
                    for (let i = 0; i < allTemp.length; i++) {
                        allTemp.eq(i).text(data.daily[i].temp.day);
                    }

                    // update all wind fields in html
                    var allWind = $(".wind");
                    for (let i = 0; i < allWind.length; i++) {
                        allWind.eq(i).text(data.daily[i].wind_speed);
                    }

                    // update all humi fields in html
                    var allHumi = $(".humi");
                    for (let i = 0; i < allHumi.length; i++) {
                        allHumi.eq(i).text(data.daily[i].humidity);
                    }

                    // update uv field and change bgcolor according to severity
                    var uv = data.daily[0].uvi;
                    var uvEl = $("#uv");
                    uvEl.text(uv);
                    if (uv<3) {
                        uvEl.css("background-color","green");
                    } else if (uv<6) {
                        uvEl.css("background-color","yellow");
                    } else {
                        uvEl.css("background-color","red");
                    }
                });
        });
}

$("#search").on('click', function (event) {
    getWeather(event);
});