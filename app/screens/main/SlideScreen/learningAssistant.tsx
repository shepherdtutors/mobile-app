import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {horizontalScale} from '../../helper/scale';

const LearningAssistant = ({
  title,
  subTitle,
  imageSource,
  currentIndex,
}: {
  title: string;
  subTitle: string;
  imageSource: string;
  currentIndex: number;
}) => {
  const slideLines = ['Item 1', 'Item 2', 'Item 3'];
  const renderBackground = () => {
    const slideIndicator = (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          flex: 1,
          paddingTop: 70,
        }}>
        {slideLines.map((_item, index) => (
          <View
            style={{
              height: 4,
              backgroundColor:
                currentIndex === index
                  ? 'white'
                  : currentIndex === 2
                  ? '#FAAD84'
                  : '#84B8FA',
              width: '30%',
              marginLeft: 10,
              borderRadius: 8,
              marginBottom: 60,
            }}
            key={index}
          />
        ))}
      </View>
    );

    // The existing switch statement
    switch (currentIndex) {
      case 1:
        return (
          <LinearGradient
            colors={['#5C7CFF', '#1846FF']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.fullSize}>
            {slideIndicator}
            {renderContent(title, subTitle, currentIndex)}
          </LinearGradient>
        );
      case 2:
        return (
          <LinearGradient
            colors={['#FC9C69', '#FA6A1D']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.fullSize}>
            {slideIndicator}
            {renderContent(title, subTitle, currentIndex)}
          </LinearGradient>
        );
      default:
        return (
          <LinearGradient
            colors={['#4E98F9', '#207DF7']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.fullSize}>
            {slideIndicator}
            {renderContent(title, subTitle, currentIndex)}
          </LinearGradient>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderBackground()}
      <Image source={imageSource as any} style={styles.image} />
    </View>
  );
};

const renderContent = (
  title: string,
  subTitle: string,
  currentIndex: number,
) => (
  <View style={styles.content}>
    <Text
      style={
        (styles.title,
        {
          color: currentIndex === 2 ? '#FCCEB5' : '#B5D4FC',
          marginTop: 50,
        })
      }>
      {title}
    </Text>
    <Text style={styles.subTitle}>{subTitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: horizontalScale(545),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 90,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
    fontWeight: 700,
    paddingBottom: 15,
  },
  subTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    width: 320,
  },
  image: {
    position: 'absolute',
    bottom: -76,
    height: '70%',
    width: '100%',
  },
  fullSize: {
    flex: 1,
    minHeight: 700,
  },
  defaultBackground: {
    flex: 1,
    backgroundColor: '#4E98F9',
  },
});

export default LearningAssistant;
