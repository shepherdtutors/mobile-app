import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {scaleHeight, scaleWidth} from '../utils';
import {GenericStylesProp} from './StackedText';

import {applyStyles} from '../assets/styles';
import StyleGuide from '../assets/style-guide';
import {scaledSize} from '../assets/style-guide/typography';

type ButtonProps = {
  children?: any;
  onPress: () => void;
  title?: string;
  mode?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'disabled'
    | 'neutral'
    | 'ghost'
    | 'error'
    | 'grey'
    | 'transparent'
    | 'pale'
    | 'phantom'
    | 'dotted'
    | 'delete'
    | 'register';
  customStyle?: any;
  textColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  bold?: boolean;
  expand?: boolean;
  size?: 'normal' | 'small';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  textExtraStyle?: any;
  indicatorSize?: 'large' | 'small' | number;
};

const Button: React.FC<ButtonProps> = ({
  children,
  title,
  mode = 'primary',
  onPress,
  customStyle,
  isLoading,
  disabled = false,
  iconLeft,
  iconRight,
  bold,
  size = 'normal',
  expand,
  textColor,
  textExtraStyle,
  indicatorSize = 'large',
}) => {
  let containerSize = styles.coreContainer;
  let coreText = styles.coreText;

  if (isLoading) {
    return (
      <View style={applyStyles('px-md', styles.indicator)}>
        <ActivityIndicator
          size={indicatorSize}
          color={StyleGuide.Colors.primary}
        />
      </View>
    );
  }

  if (disabled) {
    mode = 'disabled';
  }

  if (expand) {
    customStyle = {width: '100%', ...customStyle};
  }

  if (size === 'small') {
    containerSize = styles.smallCoreContainer;
    coreText = styles.smallCoreText;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[containerSize, styles[`${mode}Container`], customStyle]}>
      <View style={styles.contentContainer}>
        {iconLeft && <View style={styles.iconLeftMargin}>{iconLeft}</View>}
        <Text
          style={[
            coreText,
            styles[`${mode}Text`],
            bold && styles.bold,
            textColor && {color: textColor},
            textExtraStyle,
          ]}>
          {children || title}
        </Text>
        {iconRight && <View style={styles.iconRightMargin}>{iconRight}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles: GenericStylesProp = StyleSheet.create({
  coreContainer: {
    borderRadius: scaledSize(8),
    paddingVertical: scaledSize(12),
    paddingHorizontal: scaledSize(20),
    minHeight: scaleHeight(52),
    minWidth: scaleWidth(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCoreContainer: {
    borderRadius: scaledSize(12),
    paddingVertical: scaledSize(5),
    paddingHorizontal: scaledSize(12),
    minHeight: scaleHeight(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreText: {
    fontSize: StyleGuide.Typography[14],
    fontWeight: '500',
    fontFamily: 'DMSans-Regular',
  },
  smallCoreText: {
    fontSize: StyleGuide.Typography[12],
    fontWeight: '500',
  },
  bold: {
    fontWeight: 'bold',
  },
  iconLeftMargin: {},
  iconRightMargin: {},
  primaryContainer: {
    backgroundColor: StyleGuide.Colors.primary,
  },
  primaryText: {
    color: StyleGuide.Colors.white,
  },
  secondaryContainer: {
    backgroundColor: StyleGuide.Colors.shades.magenta[75],
  },
  secondaryText: {
    color: StyleGuide.Colors.white,
  },
  errorContainer: {
    backgroundColor: StyleGuide.Colors.white,
  },
  errorText: {
    color: StyleGuide.Colors.shades.red[100],
  },
  tertiaryContainer: {
    backgroundColor: 'transparent',
  },
  tertiaryText: {
    color: StyleGuide.Colors.white,
  },
  disabledContainer: {
    backgroundColor: StyleGuide.Colors.shades.grey[1000],
  },
  disabledText: {
    color: StyleGuide.Colors.white,
  },
  neutralContainer: {
    backgroundColor: StyleGuide.Colors.shades.grey[30],
  },
  neutralText: {
    color: StyleGuide.Colors.black,
  },
  ghostContainer: {
    backgroundColor: 'transparent',
    borderColor: StyleGuide.Colors.shades.grey[1100],
    borderWidth: 1,
  },
  ghostText: {
    color: StyleGuide.Colors.black,
  },
  paleContainer: {
    backgroundColor: StyleGuide.Colors.shades.blue[200],
  },
  paleText: {
    color: StyleGuide.Colors.white,
  },
  phantomContainer: {
    borderColor: StyleGuide.Colors.shades.blue[200],
    backgroundColor: StyleGuide.Colors.white,
    borderWidth: scaledSize(1),
  },
  phantomText: {
    color: StyleGuide.Colors.primary,
  },

  dottedContainer: {
    borderColor: StyleGuide.Colors.shades.grey[1100],
    backgroundColor: StyleGuide.Colors.white,
    borderWidth: scaledSize(1),
    borderStyle: 'dotted',
  },
  dottedText: {
    color: StyleGuide.Colors.primary,
  },
  transparentContainer: {
    backgroundColor: StyleGuide.Colors.white,
    borderColor: StyleGuide.Colors.shades.grey[350],
    borderWidth: scaledSize(1),
    borderRadius: scaledSize(20),
  },
  transparentText: {
    color: StyleGuide.Colors.black,
  },
  indicator: {
    alignItems: 'center',
    marginVertical: scaledSize(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deleteContainer: {
    backgroundColor: StyleGuide.Colors.shades.red[800],
  },
  deleteText: {
    color: StyleGuide.Colors.white,
  },

  registerContainer: {
    backgroundColor: StyleGuide.Colors.white,
  },
  registerText: {
    color: StyleGuide.Colors.primary,
  },
});

export default Button;
