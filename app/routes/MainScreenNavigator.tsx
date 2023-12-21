import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UpdateApp from '../screens/helper/UpdateApp';

import BottomNavigatorScreens from './bottomNavigatior';

import {RootStackParamList} from '../types';

const MainStack = createNativeStackNavigator<RootStackParamList>();
const MainScreensNavigator = () => (
  <MainStack.Navigator
    initialRouteName="TabScreens"
    screenOptions={{
      headerShown: false,
    }}>
    <MainStack.Screen name="TabScreens" component={BottomNavigatorScreens} />
    <MainStack.Screen name="UpdateApp" component={UpdateApp} />
  </MainStack.Navigator>
);

export default MainScreensNavigator;
