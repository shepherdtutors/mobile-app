import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import LearningAssistant from './learningAssistant';

const SlideScreen = () => {
  const slideLines = ['Item 1', 'Item 2', 'Item 3'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slideLines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBarColor = () => {
    switch (currentIndex) {
      case 1:
        return '#5C7CFF'; // Start color of first gradient
      case 2:
        return '#FC9C69'; // Start color of second gradient
      default:
        return '#4E98F9'; // Default color
    }
  };
  return (
    <View>
      <StatusBar
        backgroundColor={getStatusBarColor()}
        barStyle="dark-content"
      />

      {currentIndex === 0 && (
        <LearningAssistant
          currentIndex={currentIndex}
          title="LEARNING ASSISTANT"
          subTitle="Access multiple AI tools for learning"
          imageSource={require('../../../assets/images/learningAssistant.png')}
        />
      )}
      {currentIndex === 1 && (
        <LearningAssistant
          currentIndex={currentIndex}
          title="FLASHCARDS"
          subTitle="Retain information better and easier"
          imageSource={require('../../../assets/images/Deck.png')}
        />
      )}
      {currentIndex === 2 && (
        <LearningAssistant
          currentIndex={currentIndex}
          title="BARNS"
          subTitle="Learn better with like minded colleagues"
          imageSource={require('../../../assets/images/barn.png')}
        />
      )}
    </View>
  );
};

export default SlideScreen;
