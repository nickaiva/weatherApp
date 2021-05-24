"use strict";

let region = document.getElementById("location").value;
let units = document.getElementById("units").value;
console.log("Searching for ", region);
let submit = document.getElementById("submit");

submit.addEventListener('click', contactServer);

function contactServer() {


    if (region != null && units != null)
        getForecast(region, units);
}


async function getForecast(city, units) {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=";
    let apikey = "1c351426f197cfed533608b317942d35";
    let tempUnits = "&units=" + units;
    console.log("UNITS", units);
    let query = "&cnt=16&APPID=";
    let response;
    try {
        response = await fetch(url + city + tempUnits + query + apikey);
        let forecast = await response.json();
        //console.log("FORECAST ",forecast);
        render(forecast);
        return forecast;
    } catch (Error) {
        console.log("Error", Error);
        // alert(Error);
    }

}

function render(data) {

    if (data == undefined) {
        let progress = document.getElementById("progress");
        progress.classList.remove('hidden');

    } else {
        let temp_max = document.getElementById("temp_max");
        temp_max.innerHTML = data.main.temp_max;
        let temp_min = document.getElementById("temp_min");
        temp_min.innerHTML = data.main.temp_min;
        let description = document.getElementById("description");
        description.innerHTML = data.weather[0].description;
        let windspeed = document.getElementById("speed");
        windspeed.innerHTML = data.wind.speed;
        let winddirection = document.getElementById("direction");
        winddirection.innerHTML = data.wind.deg;
        //console.log("render",data.wind.speed);
    }
}
const currentWeather = contactServer();
//console.log(currentWeather);