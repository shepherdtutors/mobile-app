import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

function useKeyboard() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardDimensions, setKeyboardDimesions] = useState<any>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true);
        setKeyboardDimesions(e);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        setKeyboardDimesions(null);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return {isKeyboardVisible, keyboardDimensions};
}

export default useKeyboard;
