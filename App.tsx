import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { store } from './src/state/store';
import MusicPicker from './src/components/MusicPicker';
import Alarm from './src/components/Alarm';
import { View, StyleSheet } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <View style={styles.appContainer}>
          <MusicPicker />
          <Alarm />
        </View>
      </ApplicationProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    padding: 20,
    backgroundColor: '#1A2138',
    minHeight: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
