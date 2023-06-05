import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { store } from './src/state/store';
import MusicPicker from './src/components/MusicPicker';
import Alarm from './src/components/Alarm';
import { View } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Alarm />
          <MusicPicker />
        </View>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
