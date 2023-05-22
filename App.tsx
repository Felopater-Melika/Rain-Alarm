import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { store } from './src/state/store';
import MusicPicker from './src/components/MusicPicker';
import Alarm from './src/components/Alarm';

const App = () => {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <MusicPicker />
        <Alarm />
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
