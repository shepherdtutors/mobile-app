/* eslint-disable react/no-unstable-nested-components */
import React, {memo} from 'react';
import {View, Image, Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {MainNavParamList, RootStackParamList} from '../types';
import {scaleHeight, scaleWidth} from '../utils';
import Dashboard from '../screens/main/Dashboard';
import {scaledSize} from '../assets/style-guide/typography';
import {TabBarLabel} from '../components/TabBarLabel';

import StyleGuide from '../assets/style-guide';
import {applyStyles} from '../assets/styles';

const DashboardStack = createNativeStackNavigator<RootStackParamList>();
const DashboardTabScreensNavigator = () => (
  <DashboardStack.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerShown: false,
    }}>
    <DashboardStack.Screen name="Dashboard" component={Dashboard} />
  </DashboardStack.Navigator>
);

const MainNav = createBottomTabNavigator<MainNavParamList>();

const BottomNavigatior = () => {
  return (
    <MainNav.Navigator
      initialRouteName="DashboardTab"
      screenOptions={({route}) => {
        return {
          tabBarActiveTintColor: StyleGuide.Colors.primary,
          tabBarInactiveTintColor: StyleGuide.Colors.shades.grey['50'],
          tabBarStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop:
              Platform.OS === 'android' ? scaledSize(4) : scaledSize(0),
            paddingBottom:
              Platform.OS === 'android' ? scaledSize(16) : scaledSize(16),
            height: scaleHeight(78),
            backgroundColor:
              route.name === 'DashboardTab'
                ? StyleGuide.Colors.shades.magenta[50]
                : StyleGuide.Colors.white,
            borderTopWidth: 0,
          },
          tabBarShowLabel: true,
          headerShown: false,
        };
      }}>
      <MainNav.Screen
        name="DashboardTab"
        component={DashboardTabScreensNavigator}
        options={{
          tabBarLabel: labelProps => (
            <TabBarLabel {...labelProps}>Home</TabBarLabel>
          ),
          tabBarIcon: ({focused}) => (
            <View
              style={applyStyles(
                ...[
                  focused
                    ? {}
                    : {
                        height: scaleHeight(20),
                        width: scaleWidth(20),
                        opacity: 0.5,
                      },

                  {
                    height: scaleHeight(24),
                    width: scaleWidth(24),
                  },
                ],
              )}>
              <Image
                resizeMode="contain"
                source={
                  focused
                    ? require('../assets/images/home_dark.png')
                    : require('../assets/images/home_grey.png')
                }
                style={applyStyles(
                  ...[
                    {
                      width: undefined,
                      height: undefined,
                      flex: 1,
                    },
                  ],
                )}
              />
            </View>
          ),
        }}
      />
    </MainNav.Navigator>
  );
};

export default memo(BottomNavigatior);
