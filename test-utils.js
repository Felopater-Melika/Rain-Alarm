import React from 'react';
import { render } from '@testing-library/react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { Provider } from 'react-redux';
import { store } from './src/state/store';

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {children}
      </ApplicationProvider>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
