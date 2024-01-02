import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import WelcomeScreen from '../screens/main/Home';
import SlideScreen from '../screens/main/SlideScreen';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const NoAuthScreensNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName={'WelcomeScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AppStack.Screen name="PreviewScreen" component={SlideScreen} />
    </AppStack.Navigator>
  );
};

export default NoAuthScreensNavigator;
