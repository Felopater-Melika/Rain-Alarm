import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../../test-utils';
import { Provider } from 'react-redux';
import { store } from '../../src/state/store';
import Alarm from '../../src/components/Alarm';

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

    fireEvent.press(getByText('Toggle Alarm'));

    expect(store.getState().app.acknowledgedRain).toEqual(true);
  });
});
