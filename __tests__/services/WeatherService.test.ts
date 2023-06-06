import axios from 'axios';
import { getWeather } from '../../src/services/WeatherService';

jest.mock('axios');

describe('WeatherService', () => {
  it('mocks fetching weather data from the OpenWeather API', async () => {
    const mockData = {
      data: {
        forecast: {
          forecastday: [
            {
              hour: [
                {
                  precip_mm: 0.1,
                  time_epoch: 1620000000,
                },
              ],
            },
          ],
        },
      },
    };

    const transformedMockData = {
      hourly: mockData.data.forecast.forecastday[0].hour.map((hour: any) => ({
        rain: hour.precip_mm,
        time: hour.time_epoch * 1000,
      })),
    };

    (axios.get as jest.Mock).mockResolvedValue(mockData);

    const data = await getWeather(51.5074, -0.1278);

    expect(data).toEqual(transformedMockData);
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=51.5074,-0.1278&days=1`,
    );
  });

  it('fetches weather data from the Weather API', async () => {
    jest.unmock('axios');

    const data = await getWeather(51.5074, -0.1278);
    console.log(data);
    expect(data).not.toBeNull();

    if (data) {
      expect(data).toHaveProperty('hourly');
    }

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=51.5074,-0.1278&days=1`,
    );
  });
});
