/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  getStateFromPath,
  getPathFromState,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/core';
// import analytics from '@react-native-firebase/analytics';
import {
  Platform,
  StatusBar,
  View,
  ActivityIndicator,
  Linking,
} from 'react-native';

import {defaultTo} from 'lodash';

import {SQUAREME_DEEPLINK_URI} from '@env';

import useCustomNavigator, {
  navigationRef,
} from './app/hooks/useCustomNavigator';

// Screens
// import Splash from './app/screens/auth/Splash';

import StyleGuide from './app/assets/style-guide';
import {useAuth} from './app/context';
// import {scaledSize} from './app/assets/style-guide/typography';
// import {initializeFB} from './app/services/notifications';

import {handlePrintToConsole} from './app/utils';
import {RootStackParamList} from './app/types';

import {applyStyles} from './app/assets/styles';

import RootStackNavigtor from './app/routes';
// import {SquaremeCustomToast} from './app/components/SquaremeCustomToast';

export type MainNavParamList = {
  HomeTab: undefined;
  MoneyTab: undefined;
  ProfileTab: undefined;
  PayBillsTab: undefined;
  GiftcardsTab: undefined;
};

type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type DrawerFunctions = {
  openDrawer: () => void;
  closeDrawer: () => void;
};

export type ScreenProps<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T> & DrawerFunctions;
};

const App: React.FC<RootStackParamList> = () => {
  const {routeNameRef} = useCustomNavigator();
  const {chosenTheme} = useAuth();
  const [splash, setSplash] = React.useState(true);

  const linking = {
    prefixes: [defaultTo(SQUAREME_DEEPLINK_URI, 'shepherd-app://')],
    async getInitialURL() {
      // As a fallback, you may want to do the default deep link handling
      const url = await Linking.getInitialURL();

      return url;
    },
    // Custom function to subscribe to incoming links
    subscribe(listener: any) {
      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', ({url}) => {
        listener(url);
      });

      return () => {
        // Clean up the event listeners
        // unsubscribeFirebase();
        linkingSubscription.remove();
      };
    },
    getPathFromState(state, config) {
      const path = getPathFromState(state, config);

      return path;
    },
    getStateFromPath: (path, options) => {
      const routeState = getStateFromPath(path, options);
      return routeState;
    },
    config: {
      screens: {
        App: {
          screens: {
            PayBillsLanding: {
              path: 'paybills',
            },
            TabScreens: {
              screens: {
                HomeTab: {
                  path: 'dashboard',
                },
                ProfileTab: {
                  path: 'profile',
                },
                MoneyTab: {
                  path: 'money',
                },
              },
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    if (splash) {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content');
      }
    } else {
      if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('dark-content');
        return;
      }
      StatusBar.setBarStyle('light-content');
    }
  }, [splash]);

  useEffect(() => {
    navigationRef.addListener('state', () => {
      if (navigationRef.isReady()) {
        const currentRoute = navigationRef.getCurrentRoute();

        switch (currentRoute?.name) {
          case 'Money':
          case 'WelcomeScreen':
          case 'InformationScreen':
            StatusBar.setBarStyle('light-content');
            return;

          default:
            if (Platform.OS === 'ios') {
              StatusBar.setBarStyle('dark-content');
            } else {
              StatusBar.setBarStyle('light-content');
            }
            return;
        }
      }
    });
    return () => {
      navigationRef.removeListener('state', () => {
        handlePrintToConsole('navigationRef state listener removed');
      });
    };
  }, []);

  useEffect(() => {
    // initializeFB();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  const appTheme = [
    {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)',
        secondary: '#0984E3',
        iconNotActive: StyleGuide.Colors.shades.grey[1450],
        iconActive: '#ffffff',
        backgroundColor: StyleGuide.Colors.shades.magenta[50],
      },
    },
    {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)',
        secondary: '#0984E3',
        iconNotActive: '#979797',
        iconActive: '#979797',
        backgroundColor: StyleGuide.Colors.white,
      },
    },
  ];

  // if (splash) {
  //   return <Splash />;
  // }

  return (
    <NavigationContainer
      fallback={
        <View style={applyStyles('flex-1 justify-center items-center')}>
          <ActivityIndicator color={StyleGuide.Colors.primary} size="large" />
        </View>
      }
      linking={linking}
      ref={navigationRef}
      onReady={() => {
        // @ts-ignore
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        //@ts-ignore
        const currentRouteName = navigationRef.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
        }
        //@ts-ignore
        routeNameRef.current = currentRouteName;
      }}
      theme={appTheme[chosenTheme]}>
      {/* <ToastProvider
        placement="top"
        duration={5000}
        animationType="slide-in"
        animationDuration={250}
        successColor={StyleGuide.Colors.shades.green[200]}
        dangerColor={StyleGuide.Colors.shades.red[300]}
        warningColor={StyleGuide.Colors.shades.orange[200]}
        normalColor={StyleGuide.Colors.shades.grey[300]}
        textStyle={styles.toastFontSize}
        style={{elevation: 10}}
        renderType={{
          custom_toast: toast => <SquaremeCustomToast toast={toast} />,
          custom_error_toast: toast => (
            <SquaremeCustomToast toast={toast} variant="error" />
          ),
          custom_success_toast: toast => (
            <SquaremeCustomToast toast={toast} variant="success" />
          ),

          custom_attention_toast: toast => (
            <SquaremeCustomToast toast={toast} variant="warning" />
          ),
        }}
        swipeEnabled={true}> */}
      {/* <UserInactivity
          isActive={userIsActive}
          timeForInactivity={
            toNumber(USER_INACTIVITY_MINUTES) * toNumber(SECONDS) * 1000
          }
          onAction={isActive => {
            if ((NODE_ENV || process.env.NODE_ENV) === 'production') {
              handleSetUserIsActive(isActive);
            }
          }}
          style={{flex: 1}}> */}
      <RootStackNavigtor />
      {/* </UserInactivity> */}
      {/* </ToastProvider> */}
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   toastFontSize: {
//     fontSize: scaledSize(12),
//     // fontFamily: 'DMSans-Regular',
//   },
//   imageStyle: {
//     width: undefined,
//     height: undefined,
//     flex: 1,
//   },
// });

export default App;
