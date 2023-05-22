import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../../test-utils';
import { Provider } from 'react-redux';
import Alarm from '../../src/components/Alarm';
import checkRain from '../../src/utils/CheckRain';
import { store } from '../../src/state/store';

jest.mock('../../src/utils/CheckRain');

describe('Alarm', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Alarm />
      </Provider>,
    );

    expect(getByText(/Alarm Status:/)).toBeTruthy();
  });

  it('dispatches action on button press', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Alarm />
      </Provider>,
    );

    fireEvent.press(getByText('Toggle Alarm')); // Use 'Toggle Alarm' instead of 'handleToggleAlarm'
    expect(store.getState().app.acknowledgedRain).toEqual(true); // Expect false after button press
  });

  it('calls checkRain on mount', () => {
    checkRain.mockClear();

    render(
      <Provider store={store}>
        <Alarm />
      </Provider>,
    );

    expect(checkRain).toHaveBeenCalledTimes(1);
  });

  it('calls checkRain with correct arguments on mount', () => {
    render(
      <Provider store={store}>
        <Alarm />
      </Provider>,
    );

    const { musicFile, acknowledgedRain } = store.getState().app;

    expect(checkRain).toHaveBeenCalledWith(
      acknowledgedRain,
      musicFile,
      store.dispatch,
    );
  });
});
