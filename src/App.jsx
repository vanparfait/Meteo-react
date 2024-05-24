import loader from "./assets/loader.svg";
import "./App.css";
import { useEffect, useState } from "react";
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeaderData] = useState("null");

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        setWeaderData({
          city: datas.data.city,
          country: datas.data.country,
          temperature: datas.data.current.weather.tp,
          iconId: datas.data.current.weather.ic,
        });
      });
  }, []);

  // useEffect(() => {
  //   // Fonction pour récupérer les données de l'API
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`
  //     );
  //     const datas = await response.json();

  //     if (response.ok) {
  //       setWeaderData(datas); // Stockage des données dans l'état
  //     } else {
  //       throw new Error(`API Error: ${datas.status} - ${datas.data.message}`);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <main>
      <div className={`loader-container ${!weatherData && "active"}`}>
        <img src={loader} alt="loading icon" />
      </div>
      {weatherData && (
        <>
          <p className="city-name"> {weatherData.city} </p>
          <p className="country-name"> {weatherData.country} </p>
          <p className="temperature">{weatherData.temperature}°C</p>
          <div className="info-icon-container">
            <img
              src={`./icons/${weatherData.iconId}.svg`}
              alt="weather-icon"
              className="info-icon"
            />
          </div>
        </>
      )}
    </main>
  );
}

export default App;
