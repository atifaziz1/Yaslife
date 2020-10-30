import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import MainContainer from '../containers/MainContainer';
import UserDetails from '../components/UserDetails';

enableScreens();
type RootStackParamList = {
  MainContainer: undefined;
  UserDetails: Object | undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
