var apiKey = "b19a326e95573b97fb07965960f44846";

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${apiKey}`) //this fetch allows city name, so we can lat/lon for onecall fetch
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // update city name in html
            $(cityName).text(data.name);
            // save entry
            saveEntry(data.name);
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

//helper function to save cities searched
function saveEntry(city) {
    var cityArray = JSON.parse(localStorage.getItem("cities"));
    if (!cityArray) {
        cityArray = [city];
    } else {
        // loop through array, if alrdy exists, delete it
        for (let i=0; i<cityArray.length; i++) {
            if (cityArray[i] === city) {
                cityArray.splice(i,1);
                // end loop, no need to continue as there cant be multiple duplicates as we delete every time
                i = cityArray.length;
            }
        }
        // now the newest entry will be the city just searched
        cityArray.push(city);
    }
    // update local storage and show saved
    localStorage.setItem("cities", JSON.stringify(cityArray));
    showSaved();
}

//helper function to show saved cities in localStorage
function showSaved() {
    var cityArray = JSON.parse(localStorage.getItem("cities"));
    if (cityArray) {
        var cityList = $("#savedCityList");
        cityList.empty();
        // show last search first
        for (let i=cityArray.length-1; i>=0; i--) {
            var savedCity = $(`<button class="btn btn-secondary mb-2 w-100" type="button">${cityArray[i]}</button>`);
            cityList.append(savedCity);
        }
    }
}

$("#search").on('click', function (event) {
    event.preventDefault();
    getWeather($("#cityName").val());
    $("#cityName").val("");
});

$("#savedCityList").on('click', '.btn-secondary', function (event) {
    event.preventDefault();
    getWeather($(this).text());
});

showSaved();