import React from  'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainScreen from './MainScreen'
import DetailScreen from './DetailScreen'
const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor: "#20252c",
                shadowColor: "#20252c"
            },
            headerTintColor: "#FFFFFF"
        }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    )
}

export default MainStack;