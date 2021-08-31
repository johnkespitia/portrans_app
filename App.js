/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from 'portrans_app/src/screens/Navigator';
import {store, persistor} from 'portrans_app/src/store/store';

const App = () => {
  const [theme, setTheme] = React.useState('light');

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationProvider {...eva} theme={eva[theme]}>
            <AppNavigator />
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
