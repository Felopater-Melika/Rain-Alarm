import React, { useEffect } from 'react';
import { Button, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { setAcknowledgedRain } from '../state/appSlice';
import checkRain from '../utils/CheckRain';
import dayjs from 'dayjs';
import { View, StyleSheet } from 'react-native';

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
    (time) => `${dayjs(time).format('ddd, h:mm A')}`,
  );

  return (
    <View style={styles.container}>
      <Text category="h5" style={styles.centerText}>
        Alarm Time:{' '}
        {alarmTime ? dayjs(alarmTime).format('ddd, h A') : 'No alarm scheduled'}
      </Text>
      <Text category="h4" style={styles.centerText}>
        Alarm Status: {acknowledgedRain ? 'Acknowledged' : 'Not Acknowledged'}
      </Text>
      <Text category="h5" style={styles.centerText}>
        Rain Times:{' '}
        {formattedTimes.length > 0
          ? formattedTimes.join(', ')
          : 'No rain forecast'}
      </Text>
      <Button style={styles.button} onPress={handleToggleAlarm}>
        Toggle Alarm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1A2138',
    borderRadius: 10,
    marginBottom: 20,
  },
  centerText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF3D71',
    borderColor: '#FF3D71',
  },
});

export default Alarm;
