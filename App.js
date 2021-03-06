/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from 'portrans_app/src/components/main/MainStack'
const App =  () => {

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};


export default App;
