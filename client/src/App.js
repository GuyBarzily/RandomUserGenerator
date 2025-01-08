import React, { useEffect, useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Fetch weather data from the .NET server
    fetch('http://localhost:5199/api/Users')
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <ul>
        {weatherData.map((user, index) => (
          <li key={index}>
            <strong>{user.firstName} {user.lastName}:</strong>
            <img src={user.profilePicture}></img>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
