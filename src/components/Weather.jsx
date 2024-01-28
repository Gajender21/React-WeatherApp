import React from "react";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

function Searchbar() {
  const apiKey = "fca2a9d5c5b9def40df767be2a827680";
  const [name, setName] = React.useState();
  const [temp, setTemp] = React.useState();
  const [city, setCity] = React.useState();
  const [humidity, setHumidity] = React.useState();
  const [Visibility, setVisibility] = React.useState();
  const [windSpeed, setWindSpeed] = React.useState();
  const [country, setCountry] = React.useState();
  const [description, setDescription] = React.useState();
  const [icon, setIcon] = React.useState();
  const [min, setMin] = React.useState();
  const [max, setMax] = React.useState();
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();

  //Geolocation
  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const fetchWeather = async () => {
    try {
      window.navigator.geolocation.getCurrentPosition(savePositionToState);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      setTemp(Math.round(data.main.temp));
      setCity(data.name);
      setDescription(data.weather.main);
      setCountry(data.sys.country);
      setHumidity(data.main.humidity);
      setVisibility(data.visibility);
      setWindSpeed(data.wind.speed + "Km/h");
      setMax(" " + data.main.temp_max);
      setMin(" " + data.main.temp_min);
      const iconlink = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      setIcon(iconlink);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // async function success(position) {

  //   const currentCity = await (
  //     await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  //     )
  //   ).json();
  //   console.log(currentCity);
  //   setCity(currentCity.name);
  //   setTemp(Math.round(currentCity.main.temp) + "°C");
  //   setCountry(currentCity.sys.country);
  //   setHumidity(currentCity.main.humidity);
  //   setVisibility(currentCity.visibility);
  //   setWindSpeed(currentCity.wind.speed + "Km/h");
  //   setDescription(currentCity.weather.main);
  //   setMax(" " + currentCity.main.temp_max);
  //   setMin(" " + currentCity.main.temp_min);
  //   const iconlink = `https://openweathermap.org/img/wn/${currentCity.weather[0].icon}@2x.png`;
  //   setIcon(iconlink);

  // }
  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  /// Input Data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=Metric&appid=${apiKey}`;
  function onChangeHandler(event) {
    // console.log("change");
    setName(event.target.value);
  }
  const onClickHandler = async () => {
    let cityInfo = "";
    console.log(name);
    const result = await fetch(url);
    cityInfo = await result.json();

    setCity(cityInfo.name);
    setTemp(Math.round(cityInfo.main.temp));
    setCountry(cityInfo.sys.country);
    setHumidity(cityInfo.main.humidity);
    setVisibility(cityInfo.visibility);

    setWindSpeed(cityInfo.wind.speed + "Km/h");
    setDescription(cityInfo.weather.main);

    const iconlink = `https://openweathermap.org/img/wn/${cityInfo.weather[0].icon}@2x.png`;
    console.log(cityInfo);
    setIcon(iconlink);
    setMax(" " + cityInfo.main.temp_max);
    setMin(" " + cityInfo.main.temp_min);
    setName("");
  };

  return (
    <div>
      <div id="search">
        <div>
          <input
            placeholder="Search"
            onChange={onChangeHandler}
            value={name}
            spellCheck="false"
          />
          <span id="searchIcon">
            {" "}
            <SearchIcon onClick={onClickHandler} />
          </span>
        </div>
      </div>

      <div id="card">
        <div id="upperCard">
          <h1 id="temp">{temp}°C</h1>
          <h2 id="city">{city}</h2>
          <div id="minmax">
            <h3>Max:{max}°C</h3>
            <h3>Min:{min}°C</h3>
          </div>
        </div>
        <div id="lowerCard">
          <div id="mainInfo">
            <img id="icon" src={icon} alt=""></img>
            <h1>Smoke{description}</h1>
            <hr />
          </div>
          <div id="subInfo">
            <h3>
              {city},{country}
            </h3>
            <hr />
            <h3>Wind: {windSpeed}</h3>
            <hr />
            <h3>Visibility: {Visibility}m</h3>
            <hr />
            <h3>Humidity: {humidity}</h3>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Searchbar;
