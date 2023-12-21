import React, {
  memo,
  // useEffect
} from 'react';
import {isEmpty, isNil} from 'lodash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import {EVENTACTION} from '../types';
// import useMixPanelEvent from '../hooks/useMixpanelEvent';

import NoAuthScreensNavigator from './noAuthScreenNavigtor';
import MainScreensNavigator from './MainScreenNavigator';
import {useAuth} from '../context';

const RootStackNavigtor = memo(() => {
  const {userToken: token} = useAuth();
  // const {fireEvent} = useMixPanelEvent();

  //Mixpanel track users
  // useEffect(() => {
  //   fireEvent(EVENTACTION.initialize_app, false, 'inittialize_app');
  // }, [user, fireEvent]);

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
