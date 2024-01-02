/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import StyleGuide from '../assets/style-guide';

import {GenericStylesProp} from './StackedText';
import {scaledSize} from '../assets/style-guide/typography';
import useKeyboard from '../hooks/useKeyboard';

type LayoutProps = {
  style?: GenericStylesProp;
  safeAreaViewStyleTop?: GenericStylesProp;
  safeAreaViewStyleBottom?: GenericStylesProp;
  children: any;
  touchable?: boolean;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  style,
  safeAreaViewStyleTop,
  safeAreaViewStyleBottom,
  touchable = true,
}) => {
  const {isKeyboardVisible} = useKeyboard();
  useEffect(() => {
    if (touchable) {
      Keyboard.dismiss();
    }
  }, [touchable]);

  return (
    <>
      <SafeAreaView
        style={[
          {backgroundColor: StyleGuide.Colors.white},
          safeAreaViewStyleTop,
        ]}
      />
      <SafeAreaView
        style={[
          styles.safeView,
          {backgroundColor: StyleGuide.Colors.white},
          safeAreaViewStyleBottom,
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          {touchable ? (
            <TouchableWithoutFeedback
              style={{flex: 1}}
              onPress={() => Keyboard.dismiss()}>
              <View
                style={[
                  styles.default,
                  isKeyboardVisible && {
                    paddingBottom:
                      Platform.OS === 'ios' ? scaledSize(16) : scaledSize(16),
                  },
                  style,
                ]}>
                {children}
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View
              style={[
                styles.default,
                isKeyboardVisible && {
                  paddingBottom:
                    Platform.OS === 'ios' ? scaledSize(16) : scaledSize(16),
                },
                style,
              ]}>
              {children}
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  default: {
    flex: 1,
    backgroundColor: StyleGuide.Colors.white,
    paddingTop: Platform.OS === 'ios' ? scaledSize(8) : scaledSize(16),
    paddingHorizontal: scaledSize(24),
  },
});

export default Layout;
