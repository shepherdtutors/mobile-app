import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import WelcomeScreen from '../screens/main/Home';
import HomeScreen from '../screens/main/Home/HomeScreen';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const NoAuthScreensNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName={'WelcomeScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AppStack.Screen name="HomeScreen" component={HomeScreen} />
    </AppStack.Navigator>
  );
};

export default NoAuthScreensNavigator;
