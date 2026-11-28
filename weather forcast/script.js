const inputText = document.querySelector("#input-text");
const inputBtn = document.querySelector("#input-btn");
const weatherResultDiv = document.querySelector("#weather-result");

function getWeatherEmoji(code) {
  if (code === 0) return "☀️"; // Clear sky
  if (code === 1) return "🌤️"; // Mainly clear
  if (code === 2) return "⛅"; // Partly cloudy
  if (code === 3) return "☁️"; // Overcast

  if (code === 45 || code === 48) return "🌫️"; // Fog

  if (code >= 51 && code <= 57) return "🌦️"; // Drizzle
  if (code >= 61 && code <= 67) return "🌧️"; // Rain
  if (code >= 71 && code <= 77) return "🌨️"; // Snow

  if (code >= 80 && code <= 82) return "🌦️"; // Rain showers
  if (code >= 95 && code <= 99) return "⛈️"; // Thunderstorm

  return "🌡️"; // Unknown
}

function getWeatherDescription(code) {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";

  if (code === 45 || code === 48) return "Fog";

  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";

  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";

  return "Unknown weather";
}

if (weatherResultDiv.innerHTML === "") {
  weatherResultDiv.innerHTML = `
    <h2>🏙️ City Data will be shown here ✌︎㋡</h2>
  `;
}

async function btnClick() {
  const city = inputText.value;

  if (!city.trim()) {
    weatherResultDiv.innerHTML = `<p>💀 Please enter a city name.</p>`;
    return;
  }

  // STEP 1: Get latitude and longitude from city
  const geoUrl = `/api/geocode?city=${encodeURIComponent(city)}`;

  try {
    const geoResponse = await fetch(geoUrl);
    const geoResult = await geoResponse.json();

    console.log("Geocoding result:", geoResult);

    // Check if city was found
    if (geoResult.length === 0) {
      weatherResultDiv.innerHTML = `<p>City not found.</p>`;
      return;
    }

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

    const weatherCode = weatherResult.current.weather_code;

    const weatherEmoji = getWeatherEmoji(weatherCode);

    const weatherDescription = getWeatherDescription(weatherCode);

    // STEP 5: Display weather
    weatherResultDiv.innerHTML = `
    <h2>${weatherEmoji} ${city}</h2>

    <p>🌡️ Temperature: ${weatherResult.current.temperature_2m}°C</p>
    <p>🌤️ Feels Like: ${weatherResult.current.apparent_temperature}°C</p>
    
    <p>💧 Humidity: ${weatherResult.current.relative_humidity_2m}%</p>
    
    <p>💨 Wind Speed: ${weatherResult.current.wind_speed_10m} km/h</p>
    
    <p>🌈 Weather: ${weatherDescription}</p>
    `;
  } catch (error) {
    console.error(error);

    weatherResultDiv.innerHTML = `
    
      <p>Unable to get weather data.</p>
    `;
  }
}
inputBtn.addEventListener("click", btnClick);
inputText.addEventListener("keydown", (event) => {
  if (event.key === "Enter") btnClick();
});
