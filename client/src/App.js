import React, { useEffect, useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Fetch weather data from the .NET server
    fetch('http://localhost:5199/weatherforecast')
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <ul>
        {weatherData.map((forecast, index) => (
          <li key={index}>
            <strong>{forecast.date}:</strong> {forecast.temperatureC}°C - {forecast.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
