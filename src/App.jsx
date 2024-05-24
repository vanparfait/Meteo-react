import loader from "./assets/loader.svg";
import "./App.css";

function App() {
  return (
    <main>
      <div className="loader-container">
        <img src={loader} alt="loading icon" />
      </div>
      <p className="city-name">Paris</p>
      <p className="country-name">France</p>
      <p className="temperature">17</p>
      <div className="info-icon-container">
        <img src="./icons/01d.svg" alt="weather-icon" className="info-icon" />
      </div>
    </main>
  );
}

export default App;
