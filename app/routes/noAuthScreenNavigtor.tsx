import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import ReactDemoScreen from '../screens/helper/ReactDemoScreen';
import Login from '../screens/auth/Login';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const NoAuthScreensNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="ReactDemoScreen" component={ReactDemoScreen} />
      <AppStack.Screen name="Login" component={Login} />
    </AppStack.Navigator>
  );
};

export default NoAuthScreensNavigator;
