import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import StyleGuide from '../../../assets/style-guide';
import {scaleHeight} from '../../../utils';

const Splash: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer]}>
        <Image
          source={require('../../../assets/images/shepherd-logo-white.png')}
          style={[styles.image]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imageContainer: {
    width: '70%',
    maxWidth: '70%',
    height: scaleHeight(80),
    maxHeight: scaleHeight(85),
  },
  image: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
});

export default Splash;
