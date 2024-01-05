import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import ReactDemoScreen from '../screens/helper/ReactDemoScreen';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ConfirmPassword from '../screens/auth/ConfirmPassword';
import ForgotPassword from '../screens/auth/ForgotPassword';

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
      <AppStack.Screen name="Register" component={Register} />
      <AppStack.Screen name="ConfirmPassword" component={ConfirmPassword} />
      <AppStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AppStack.Navigator>
  );
};

export default NoAuthScreensNavigator;
