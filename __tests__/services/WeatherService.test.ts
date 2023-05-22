import axios from 'axios';
import { getWeather } from '../../src/services/WeatherService';

jest.mock('axios');

describe('WeatherService', () => {
  it('mocks fetching weather data from the OpenWeather API', async () => {
    const mockData = { hourly: { weather: [{ main: 'Rain' }] } };
    (axios.get as jest.Mock).mockResolvedValue(mockData);

    const data = await getWeather(51.5074, -0.1278);

    expect(data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/onecall?lat=51.5074&lon=-0.1278&exclude=current,minutely,daily,alerts&units=imperial&appid=${process.env.WEATHER_API_KEY}`,
    );
  });

  it('fetches weather data from the OpenWeather API', async () => {
    const data = await getWeather(51.5074, -0.1278);

    expect(data).not.toBeNull();
    if (data) {
      expect(data).toHaveProperty('hourly');
    }

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/onecall?lat=51.5074&lon=-0.1278&exclude=current,minutely,daily,alerts&units=imperial&appid=${process.env.WEATHER_API_KEY}`,
    );
  });
});
