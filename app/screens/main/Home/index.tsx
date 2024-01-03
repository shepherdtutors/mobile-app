import React from 'react';
import type {PropsWithChildren} from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';

import HomeScreen from './HomeScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
