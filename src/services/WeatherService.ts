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

    public async getWeather(city: string): Promise<any> {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
        );

        return response.data;
    }
}