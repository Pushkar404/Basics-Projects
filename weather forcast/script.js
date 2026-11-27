const inputText = document.querySelector("#input-text");
const inputBtn = document.querySelector("#input-btn");
const weatherResultDiv = document.querySelector("#weather-result");

inputBtn.addEventListener("click", async function () {
  const city = inputText.value;

  // STEP 1: Get latitude and longitude from city
  const geoUrl = `https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding?city=${city}`;

  const geoOptions = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "7dec5641dfmshbf5c52f1e4b8439p12898bjsn33292f00cc9f",
      "x-rapidapi-host": "geocoding-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const geoResponse = await fetch(geoUrl, geoOptions);
    const geoResult = await geoResponse.json();

    console.log("Geocoding result:", geoResult);

    // STEP 2: Extract coordinates
    const lat = geoResult[0].latitude;
    const lon = geoResult[0].longitude;

    console.log("Latitude:", lat);
    console.log("Longitude:", lon);

    // STEP 3: Use coordinates in Open-Meteo Weather API
    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;

    // STEP 4: Fetch weather
    const weatherResponse = await fetch(weatherUrl);
    const weatherResult = await weatherResponse.json();

    console.log("Weather result:", weatherResult);

    // STEP 5: Display weather
    weatherResultDiv.innerHTML = `
  <h2>
  <img src="img/Clouds.svg" alt="Location">
    ${city}
    
  </h2>

      <p>🌡️ Temperature: ${weatherResult.current.temperature_2m}°C</p>

  <p>🌤️ Feels Like: ${weatherResult.current.apparent_temperature}°C</p>

  <p>💧 Humidity: ${weatherResult.current.relative_humidity_2m}%</p>

  <p>💨 Wind Speed: ${weatherResult.current.wind_speed_10m} km/h</p>

  <p>☀️ Weather Code: ${weatherResult.current.weather_code}</p>
    `;
  } catch (error) {
    console.error(error);

    weatherResultDiv.innerHTML = `
      <p>Unable to get weather data.</p>
    `;
  }
});
