import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, SafeAreaView} from 'react-native';
import {ShepherdLogo} from './images/svg/splashScreenLoader';

const SplashScreen = () => {
  const logoAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [logoAnimation]);

  const logoStyle = {
    opacity: logoAnimation,
    transform: [
      {
        scale: logoAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.85, 1],
        }),
      },
      {
        translateY: logoAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerBody}>
        <Animated.View style={logoStyle}>
          <ShepherdLogo />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#207DF7',
  },

  containerBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default SplashScreen;
