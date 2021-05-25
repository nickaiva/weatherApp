"use strict";

// listen for any form submit event https://www.devextent.com/fetch-api-post-formdata-object/
// https://github.com/CodeExplainedRepo/Weather-App-JavaScript
document.body.addEventListener("submit", async function (event) {
    event.preventDefault();
    let city = document.getElementById("location").value;
    let units = document.getElementById("units").value;
    console.log("Searching for ", city);

    let url = "http://api.openweathermap.org/data/2.5/weather?q=";
    let apikey = "";
    let tempUnits = "&units=" + units;
    console.log("UNITS", units);
    let query = "&cnt=16&APPID=";
    let response;
    try {
        if (city != "" && units != "") {
            response = await fetch(url + city + tempUnits + query + apikey, { mode: 'cors', cache: 'no-cache' });
            let forecast = await response.json();
            //console.log("FORECAST ",forecast);
            render(forecast);
            return forecast;
        } else {
            console.log('Empty arguments', city, units);
            return;
        }

    } catch (Error) {
        console.log("Error", Error);
        
    }

});

function render(data) {

    let forecast = document.getElementById("forecast");
    let progress = document.getElementById("progress");
    let locationIcon = document.querySelector('.weather-icon');
    if (data.main == undefined) {
        
        progress.classList.remove('hidden');
        progress.classList.add('shown');
        forecast.classList.remove('shown');
        forecast.classList.add('hidden');

    } else {
        progress.classList.remove('shown');
        progress.classList.add('hidden');
        forecast.classList.remove('hidden');
        forecast.classList.add('shown');
        let temp_max = document.getElementById("temp_max");
        temp_max.innerHTML = data.main.temp_max + '&deg;';
        let temp_min = document.getElementById("temp_min");
        temp_min.innerHTML = data.main.temp_min + '&deg;';
        let description = document.getElementById("description");
        description.innerHTML = data.weather[0].description;
        let windspeed = document.getElementById("speed");
        windspeed.innerHTML = data.wind.speed;
        let winddirection = document.getElementById("direction");
        winddirection.innerHTML = data.wind.deg + '&deg;';
        const {icon} = data.weather[0];
        locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
        //console.log("render",data.wind.speed);
    }
}
