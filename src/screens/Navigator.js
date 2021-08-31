import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Drawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import HomeScreen from 'portrans_app/src/screens/HomeScreen';
import LoginScreen from 'portrans_app/src/screens/LoginScreen';
import ConfigScreen from 'portrans_app/src/screens/ConfigScreen';

const {Navigator, Screen} = createDrawerNavigator();

const DrawerContent = ({navigation, state}) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title="Home" />
    <DrawerItem title="Login" />
    <DrawerItem title="Config" />
  </Drawer>
);

export const DrawerNavigator = () => {
  const user = useSelector(state => state.userReducer.user);
  console.log(user);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Screen name="Home" component={HomeScreen} />
        {user && <Screen name="Login" component={LoginScreen} />}
        <Screen name="Config" component={ConfigScreen} />
      </Navigator>
    </SafeAreaView>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
