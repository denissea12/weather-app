import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [input, setInput] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  function displayWeather(response) {
    setWeather({
      temperature: response.data.temperature.current,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      icon: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
    });
    setLoaded(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apikey = "3d5bfbffo3ac0fea0f4a244a4b9t3ca4";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${input}&key=${apikey}`;
    axios.get(apiUrl).then(displayWeather);
  }

  function UpdateCity(event) {
    setInput(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city" onChange={UpdateCity} />
      <button type="Submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind Speed: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt="Weather Icon" />
          </li>
        </ul>
        <a href="https://github.com/denissea12/weather-app">Open-source code</a>{" "}
        by{" "}
        <a href="https://www.shecodes.io/graduates/131305-denisse-ramirez">
          Denisse Ramirez
        </a>{" "}
        on SheCodes
      </div>
    );
  } else {
    return form;
  }
}
