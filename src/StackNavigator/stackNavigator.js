import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainContainer from '../containers/MainContainer';
import UserDetails from '../components/UserDetails';


enableScreens();
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
            <Stack.Screen name="MainContainer" component={MainContainer} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
        </Stack.Navigator>
    </NavigationContainer>
   
  );
}

export default MainStack;