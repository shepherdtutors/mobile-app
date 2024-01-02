import React, {memo} from 'react';
import {isEmpty, isNil} from 'lodash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NoAuthScreensNavigator from './noAuthScreenNavigtor';
import MainScreensNavigator from './MainScreenNavigator';
import {useAuth} from '../context';

const RootStackNavigtor = memo(() => {
  const {userToken: token} = useAuth();

  const RootStack = createNativeStackNavigator();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isEmpty(token) && !isNil(token) ? (
        <RootStack.Screen
          name="App"
          component={MainScreensNavigator}
          options={{animation: 'none'}}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={NoAuthScreensNavigator}
          options={{animation: 'none'}}
        />
      )}
    </RootStack.Navigator>
  );
});

export default RootStackNavigtor;
