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

  const handleToggleAlarm = () => {
    dispatch(setAcknowledgedRain(!acknowledgedRain));
  };

  useEffect(() => {
    checkRain(acknowledgedRain, musicFile, dispatch);
    const intervalId = setInterval(
      () => checkRain(acknowledgedRain, musicFile, dispatch),
      12 * 60 * 60 * 1000,
    );

    return () => clearInterval(intervalId);
  }, [weatherData, acknowledgedRain, musicFile, dispatch]);

  return (
    <>
      <Text category="h4">
        Alarm Status: {acknowledgedRain ? 'Acknowledged' : 'Not Acknowledged'}
      </Text>
      <Button onPress={handleToggleAlarm}>Toggle Alarm</Button>
    </>
  );
};

export default Alarm;
