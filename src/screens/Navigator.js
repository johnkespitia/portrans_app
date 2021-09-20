import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Drawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import HomeScreen from 'portrans_app/src/screens/HomeScreen';
import LoginScreen from 'portrans_app/src/screens/LoginScreen';
import ConfigScreen from 'portrans_app/src/screens/ConfigScreen';
import ChecklistScreen from 'portrans_app/src/screens/ChecklistScreen';
import ChecklistSectionScreen from 'portrans_app/src/screens/ChecklistSectionScreen';
import ChecklistFormScreen from 'portrans_app/src/screens/ChecklistFormScreen';

const {Navigator, Screen} = createDrawerNavigator();
const ChecklistStack = createNativeStackNavigator();

const ChecklistNavigator = ({navigation, state}) => {
  return (
    <ChecklistStack.Navigator>
      <ChecklistStack.Screen name="Checklists" component={ChecklistScreen} />
      <ChecklistStack.Screen
        name="ChecklistsSection"
        component={ChecklistSectionScreen}
      />
      <ChecklistStack.Screen
        name="ChecklistsForm"
        component={ChecklistFormScreen}
      />
    </ChecklistStack.Navigator>
  );
};
const DrawerContent = ({navigation, state, user}) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={index => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title="Home" />
    {user === null && <DrawerItem title="Login" />}
    {user !== null && <DrawerItem title="Checklist" />}
    <DrawerItem title="Config" />
  </Drawer>
);

export const DrawerNavigator = () => {
  const user = useSelector(state => state.userReducer.user);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigator
        drawerContent={props => <DrawerContent {...props} user={user} />}>
        <Screen name="Home" component={HomeScreen} />
        {user === null && <Screen name="Login" component={LoginScreen} />}
        {user !== null && (
          <>
            <Screen
              name="Checklist"
              component={ChecklistNavigator}
              options={{headerShown: false}}
            />
          </>
        )}
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
