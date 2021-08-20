import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from 'portrans_app/src/screens/HomeScreen';
import LoginScreen from 'portrans_app/src/screens/LoginScreen';
import ConfigScreen from 'portrans_app/src/screens/ConfigScreen';

const {Navigator, Screen} = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator headerShown={false}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Config" component={ConfigScreen} />
    </Navigator>
  </NavigationContainer>
);
