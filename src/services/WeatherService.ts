import axios from 'axios';

const apiKey = process.env.WEATHER_API_KEY;

export async function getWeather(lat: number, lon: number): Promise<any> {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=imperial&appid=${apiKey}`,
    );
    return response;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}
