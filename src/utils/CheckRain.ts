import { setWeatherData } from '../state/appSlice';
import { AppDispatch } from '../state/store';
import { getWeather } from '../services/WeatherService';
import {
  scheduleNotification,
  scheduleAlarm,
} from '../services/NotificationService';
import { Audio } from 'expo-av';

const checkRain = async (
  acknowledgedRain: boolean,
  musicFile: string | null,
  dispatch: AppDispatch,
): Promise<void> => {
  const weather = await getWeather(36.300548, -86.604438);
  dispatch(setWeatherData(weather));

  const rainForecast = weather.hourly.find(
    (hour: { rain: number }) => hour.rain >= 1,
  );

  if (rainForecast) {
    await scheduleNotification(
      `It's going to rain at ${rainForecast.time}`,
      'Get the dog inside!',
    );
    if (!acknowledgedRain && musicFile) {
      const oneHourBeforeRain = new Date(rainForecast.time);
      oneHourBeforeRain.setHours(oneHourBeforeRain.getHours() - 1);

      await scheduleAlarm(oneHourBeforeRain, musicFile);

      const { sound } = await Audio.Sound.createAsync(
        { uri: musicFile },
        { shouldPlay: true },
      );
      await sound.playAsync();
    }
  }
};

export default checkRain;
