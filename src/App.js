import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherAction } from "./redux/weatherSlice";

import "./App.css";
import SearchIcon from "./Assets/Img/search.svg";

const App = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherAction("Tashkent"));
  }, []);

  const state = useSelector((state) => state);
  const { weather,  error } = state.weatherSlice;

  let bgImage = "";
  if (
    weather?.weather[0].main === "Rain" ||
    weather?.weather[0].main === "Drizzle"
  ) {
    bgImage =
      "https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1331&q=80";
  } else if (weather?.clouds.all > 50) {
    bgImage =
      "https://images.unsplash.com/photo-1495933925743-bb94d1d4ea4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  } else if (weather?.clouds.all < 50) {
    bgImage =
      "https://images.unsplash.com/photo-1438129460879-8f5868d4a802?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";
  } else {
    bgImage =
      "https://images.unsplash.com/photo-1438129460879-8f5868d4a802?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";
  }

  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const Hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  const Minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

  const Time = `${Hours} : ${Minutes} - ${
    days[date.getDay()]
  }, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

  return (
    <div className="App" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="main">
        <div className="top">
          <div className="logo">the.Weather</div>
          <div className="mSearch">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="searchInp"
              type="text"
              placeholder="Enter a Location"
            />
            <img
              className="searchBtn"
              onClick={() => dispatch(fetchWeatherAction(city))}
              src={SearchIcon}
              alt="Search Icon"
            />
          </div>
        </div>
        {error ? (
          <div className="warning">Enter a Valid Location Like: Berlin, Tashkent</div>
        ) : (
          <div className="weatherInfo">
            <div className="weatherMeasure">
              {Math.round(weather?.main.temp - 273.15)}&deg;
            </div>
            <div className="weatherStatus">
              <div className="weatherLocation">{weather?.name}</div>
              <div className="weatherDate">{Time}</div>
            </div>
            <div className="weatherIcon">
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
              <div className="weatherType">
                {weather?.weather[0].description}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Side */}
      <div className="side">
        <div className="searchArea">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="searchInp"
            type="text"
            placeholder="Search For Location"
          />
          <img
            className="searchBtn"
            onClick={() => dispatch(fetchWeatherAction(city))}
            src={SearchIcon}
            alt="Search Icon"
          />
        </div>
        <div className="favLocations">
          <li onClick={() => dispatch(fetchWeatherAction("Tashkent"))}>
            Tashkent
          </li>
          <li onClick={() => dispatch(fetchWeatherAction("Urgench"))}>
            Urgench
          </li>
          <li onClick={() => dispatch(fetchWeatherAction("Samarkand"))}>
            Samarkand
          </li>
          <li onClick={() => dispatch(fetchWeatherAction("Buhoro"))}>Buhoro</li>
          <li onClick={() => dispatch(fetchWeatherAction("Andijon"))}>
            Andijon
          </li>
        </div>
        <div className="weatherDetails">
          <div className="title">Weather Details</div>
          <div className="weatherDetail">
            <li>
              <span>Cloudy</span>
              <span>{weather?.clouds.all} %</span>
            </li>
            <li>
              <span>Humidity</span>
              <span>{weather?.main.humidity} %</span>
            </li>
            <li>
              <span>Wind</span>
              <span>{weather?.wind.speed} m/s</span>
            </li>
            <li>
              <span>Visibilty</span>
              <span>{weather?.visibility / 1000} Km</span>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
