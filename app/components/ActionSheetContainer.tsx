import React from 'react';
import {StyleSheet, View, Text, Platform, TouchableOpacity} from 'react-native';
import StyleGuide from '../assets/style-guide';
import {scaledSize} from '../assets/style-guide/typography';

type ActionSheetContainerProps = {
  children: React.ReactNode;
  title?: string;
  extraStyles?: Record<string, string>;
  extraStylesContainer?: Record<string, string>;
  onPressCancel?: () => void;
  showCancel?: boolean;
};

const ActionSheetContainer: React.FC<ActionSheetContainerProps> = ({
  children,
  title,
  extraStyles = {},
  extraStylesContainer = {},
  onPressCancel = () => {},
  showCancel = false,
}) => (
  <View
    style={[
      title ? styles.actionSheetWrapper : styles.bottomMargin,
      extraStyles,
    ]}>
    <View style={[styles.actionSheetMainContainer]}>
      <View style={[styles.actionSheetContainer, extraStylesContainer]}>
        <Text style={styles.actionSheetPrompt}>{title}</Text>
      </View>

      {showCancel && (
        <View style={[styles.actionSheetCancelTextContainer]}>
          <TouchableOpacity onPress={onPressCancel}>
            <Text style={styles.actionSheetCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>

    {children}
  </View>
);

const styles = StyleSheet.create({
  actionSheetWrapper: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  actionSheetMainContainer: {
    position: 'relative',
    // flexDirection: 'row',
    // justifyContent: 'center',
  },
  actionSheetCancelTextContainer: {
    position: 'absolute',
    right: scaledSize(0),
  },
  actionSheetCancelText: {
    color: StyleGuide.Colors.shades.magenta[50],
    fontSize: scaledSize(12),
    lineHeight: scaledSize(17),
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
  },
  actionSheetContainer: {},
  actionSheetPrompt: {
    fontSize: Platform.OS === 'ios' ? scaledSize(14) : scaledSize(14),
    fontWeight: '300',
    color: StyleGuide.Colors.primary,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
  bottomMargin: {
    marginBottom: 32,
    marginHorizontal: 24,
  },
});

export default ActionSheetContainer;
