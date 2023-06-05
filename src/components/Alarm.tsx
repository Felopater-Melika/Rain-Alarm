import React, { useEffect } from 'react';
import { Button, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { setAcknowledgedRain } from '../state/appSlice';
import checkRain from '../utils/CheckRain';

const Alarm = () => {
  const acknowledgedRain = useSelector(
    (state: RootState) => state.app.acknowledgedRain,
  );

  const musicFile = useSelector((state: RootState) => state.app.musicFile);

  const weatherData = useSelector((state: RootState) => state.app.weatherData);

  const dispatch = useDispatch<AppDispatch>();

  const [rainTimes, setRainTimes] = React.useState<Date[]>([]);
  const [alarmTime, setAlarmTime] = React.useState<Date | null>(null);

  useEffect(() => {
    if (weatherData) {
      const rainForecasts = weatherData.hourly.filter(
        (hour: { rain: number }) => hour.rain >= 0.1,
      );

      const rainTimes = rainForecasts.map(
        (forecast: any) => new Date(forecast.time),
      );
      setRainTimes(rainTimes);
    }
  }, [weatherData]);

  const handleToggleAlarm = () => {
    dispatch(setAcknowledgedRain(!acknowledgedRain));
  };
  useEffect(() => {
    const fetchAlarmTime = async () => {
      const time = await checkRain(acknowledgedRain, musicFile, dispatch);
      setAlarmTime(time);
    };

    fetchAlarmTime();

    const intervalId = setInterval(
      () => checkRain(acknowledgedRain, musicFile, dispatch),
      24 * 60 * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, [acknowledgedRain, musicFile, dispatch]);

  const formattedTimes = rainTimes.map(
    (time) =>
      `${time.toLocaleDateString('en-US', {
        weekday: 'long',
      })}, ${time.getHours()}:00`,
  );

  return (
    <>
      <Text
        category="h5"
        status="info"
        appearance="default"
        style={{ textAlign: 'center' }}
      >
        Alarm Time: {alarmTime ? alarmTime.toString() : 'No alarm scheduled'}
      </Text>
      <Text
        category="h4"
        status="info"
        appearance="default"
        style={{ textAlign: 'center' }}
      >
        Alarm Status: {acknowledgedRain ? 'Acknowledged' : 'Not Acknowledged'}
      </Text>
      <Text
        category="h5"
        status="info"
        appearance="default"
        style={{ textAlign: 'center' }}
      >
        Rain Times:{' '}
        {formattedTimes.length > 0
          ? formattedTimes.join(', ')
          : 'No rain forecast'}
      </Text>
      <Button onPress={handleToggleAlarm}>Toggle Alarm</Button>
    </>
  );
};

export default Alarm;
