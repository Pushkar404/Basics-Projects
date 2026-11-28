export default async function handler(req, res) {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({
      error: "City is required",
    });
  }

  const url = `https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding?city=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": "geocoding-by-api-ninjas.p.rapidapi.com",
      },
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch geocoding data",
    });
  }
}
