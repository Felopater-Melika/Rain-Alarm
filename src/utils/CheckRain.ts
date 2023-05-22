import { setWeatherData } from '../state/appSlice';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import WeatherService from '../services/WeatherService';
import NotificationService from '../services/NotificationService';

const checkRain = async (): Promise<void> => {
  const acknowledgedRain = useSelector(
    (state: RootState) => state.app.acknowledgedRain,
  );
  const musicFile = useSelector((state: RootState) => state.app.musicFile);
  const weatherService = WeatherService.getInstance();
  const notificationService = new NotificationService();
  const weather = await weatherService.getWeather(36.300548, -86.604438);
  const dispatch = useDispatch<AppDispatch>();
  dispatch(setWeatherData(weather));

  const rainForecast = weather.hourly.find(
    (hour: { rain: number }) => hour.rain >= 1,
  );

  if (rainForecast) {
    await notificationService.scheduleNotification(
      `It's going to rain at ${rainForecast.time}`,
      'Get the dog inside!',
    );
    if (!acknowledgedRain && musicFile) {
      const oneHourBeforeRain = new Date(rainForecast.time);
      oneHourBeforeRain.setHours(oneHourBeforeRain.getHours() - 1);

      await notificationService.scheduleAlarm(oneHourBeforeRain, musicFile);

      const { sound } = await Audio.Sound.createAsync(
        { uri: musicFile },
        { shouldPlay: true },
      );
      await sound.playAsync();
    }
  }
};

export default checkRain;
