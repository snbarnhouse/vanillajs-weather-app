function displayTemperature(response) {
    console.log(response.data);
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = Math.round(response.data.main.temp);
    let city = document.querySelector("#city-name");
    city.innerHTML = response.data.name;
    let description = document.querySelector("#weather-description");
    description.innerHTML = response.data.weather[0].description;
    let highTemp = document.querySelector("#high-temp");
    highTemp.innerHTML = Math.round(response.data.main.temp_max);
    let lowTemp = document.querySelector("#low-temp");
    lowTemp.innerHTML = Math.round(response.data.main.temp_min);
    let feelsLike = document.querySelector("#real-feel");
    feelsLike.innerHTML = Math.round(response.data.main.feels_like);
}
let apiKey = "1743d71cea491649f0bd96f06af46d71";
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=Raleigh&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature);