import React, {useState, useEffect, useCallback} from 'react';
import {StatusBar, View} from 'react-native';
import PreviewScreen from '../Home/PreviewScreen';

const HomeScreen = () => {
  const slideLines = ['Item 1', 'Item 2', 'Item 3'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const getStatusBarColor = useCallback(() => {
    switch (currentIndex) {
      case 1:
        return '#5C7CFF';
      case 2:
        return '#FC9C69';
      default:
        return '#4E98F9';
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slideLines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <StatusBar
        backgroundColor={getStatusBarColor()}
        barStyle="dark-content"
      />

      {currentIndex === 0 && (
        <PreviewScreen
          currentIndex={currentIndex}
          title="LEARNING ASSISTANT"
          subTitle="Access multiple AI tools for learning"
          imageSource={require('../../../assets/images/learningAssistant.png')}
        />
      )}
      {currentIndex === 1 && (
        <PreviewScreen
          currentIndex={currentIndex}
          title="FLASHCARDS"
          subTitle="Retain information better and easier"
          imageSource={require('../../../assets/images/Deck.png')}
        />
      )}
      {currentIndex === 2 && (
        <PreviewScreen
          currentIndex={currentIndex}
          title="BARNS"
          subTitle="Learn better with like minded colleagues"
          imageSource={require('../../../assets/images/barn.png')}
        />
      )}
    </View>
  );
};

export default HomeScreen;
