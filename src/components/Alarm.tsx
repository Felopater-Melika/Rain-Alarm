// src/components/Alarm.tsx

import React from 'react';
import { Button, Text } from '@ui-kitten/components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { setAcknowledgedRain } from '../state/appSlice';

const Alarm = () => {
  const acknowledgedRain = useSelector(
    (state: RootState) => state.app.acknowledgedRain,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleAlarm = () => {
    dispatch(setAcknowledgedRain(!acknowledgedRain));
  };

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
