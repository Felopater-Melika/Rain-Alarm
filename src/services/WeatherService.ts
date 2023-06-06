import axios from 'axios';

const apiKey = process.env.WEATHER_API_KEY;

export async function getWeather(lat: number, lon: number): Promise<any> {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1`,
    );

    // Extract the forecast data for the next 24 hours
    const forecastData = response.data.forecast.forecastday[0].hour;

    // Map the forecast data to match the structure of the previous API
    const weatherData = {
      hourly: forecastData.map((hour: any) => ({
        rain: hour.precip_mm,
        time: hour.time_epoch * 1000,
      })),
    };

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}
