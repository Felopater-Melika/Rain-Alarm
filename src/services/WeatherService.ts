import axios from 'axios';

export class WeatherService {
  private static instance: WeatherService;
  private apiKey = process.env.WEATHER_API_KEY;

  private constructor() {}

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }

    return WeatherService.instance;
  }

  public async getWeather(lat: number, lon: number): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=imperial&appid=${this.apiKey}`,
      );
      return response;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }
}
