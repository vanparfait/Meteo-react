import loader from "./assets/loader.svg";
import browser from "./assets/browser.svg";
import "./App.css";
import { useEffect, useState } from "react";
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeaderData] = useState(null);
  const [errorWeather, setErrorWeather] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données de l'API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`
        );
        console.log(response);
        const datas = await response.json();
        console.log(datas);

        if (response.ok) {
          setWeaderData(datas.data); // Stockage des données dans l'état
          setErrorWeather(null);
        } else {
          throw new Error(`API Error: ${datas.status} - ${datas.data.message}`);
        }
      } catch (error) {
        setErrorWeather(error.message); // Définit le message d'erreur
        setWeaderData(null); // Réinitialise les données météorologiques
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div
        className={`loader-container ${
          !weatherData && !errorWeather && "active"
        }`}
      >
        <img src={loader} alt="loading icon" />
      </div>
      {weatherData && (
        <>
          <p className="city-name"> {weatherData.city} </p>
          <p className="country-name"> {weatherData.country} </p>
          <p className="temperature">{weatherData.current.weather.tp}°C</p>
          <div className="info-icon-container">
            <img
              src={`./icons/${weatherData.current.weather.ic}.svg`}
              alt="weather-icon"
              className="info-icon"
            />
          </div>
        </>
      )}

      {errorWeather && !weatherData && (
        <>
          <p className="error-information">{errorWeather}</p>

          <img src={browser} alt="browser icon" />
        </>
      )}
    </main>
  );
}

export default App;
