function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`
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
  let month = date.getMonth();

  return `${day} ${hours}:${minutes}`;
  
}

// function formatDay(date) {
//     let now = new Date();
//     let month = now.getMonth();
//     console.log(now.getMonth());
//     return `${month}`;
// }

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
  let date = document.querySelector("#current-date");
  date.innerHTML = formatDate(response.data.dt * 1000);
//   let currentDate = document.querySelector("#current-month");
//   currentDate.innerHTML = formatDay;
}
let apiKey = "1743d71cea491649f0bd96f06af46d71";
let city = "Raleigh";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(displayTemperature);
