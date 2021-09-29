function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}


//Get future forecast
function getForecast(coordinates) {
  let apiKey = "1743d71cea491649f0bd96f06af46d71";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  let feelsLike = document.querySelector("#real-feel");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#current-date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  fahrenheitFeelsLike = response.data.main.feels_like;
  fahrenheitTemperature = response.data.main.temp;

  getForecast(response.data.coord);

}

function search(city) {
  let apiKey = "1743d71cea491649f0bd96f06af46d71";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Get Current Location button functionality
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1743d71cea491649f0bd96f06af46d71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#button");
button.addEventListener("click", getCurrentPosition);

//Convert to celsius
function convertToCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let currentTemperature = document.querySelector("#current-temperature");

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  let celsiusFeelsLike = ((fahrenheitFeelsLike - 32) * 5) / 9;
  let celsiusFeelsLikeTemp = document.querySelector("#real-feel");
  celsiusFeelsLikeTemp.innerHTML = Math.round(celsiusFeelsLike);
  let celsiusHigh = ((fahrenheitHigh - 32) * 5) / 9;
  let celsiusHighTemp = document.querySelector("#high-temp");
  celsiusHighTemp.innerHTML = Math.round(celsiusHigh);
  let celsiusLow = ((fahrenheitLow - 32) * 5) / 9;
  let celsiusLowTemp = document.querySelector("#low-temp");
  celsiusLowTemp.innerHTML = Math.round(celsiusLow);
}

let fahrenheitTemperature = null;
let fahrenheitFeelsLike = null;
let fahrenheitHigh = null;
let fahrenheitLow = null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
  let feelsLikeTemp = document.querySelector("#real-feel");
  feelsLikeTemp.innerHTML = Math.round(fahrenheitFeelsLike);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

search("Raleigh");

//Future forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#future-forecast");

  
  let forecastHTML = `<div class= "row">`;
  //Looping through each day of days array
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
          <div class="weather-forecast-date">
          ${formatDay(forecastDay.dt)}
          </div>
          <img src= "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width= "40" />
          <div class="weather-forecast-temperature">
            <span class= "weather-forecast-max">${Math.round(forecastDay.temp.max)}</span>°/
          <span class = "weathe-forecast-min">${Math.round(forecastDay.temp.min)}</span>°
            </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day= date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
