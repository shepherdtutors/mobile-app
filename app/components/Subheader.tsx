import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  StyleSheetProperties,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {scaleWidth} from '../utils';
import StyleGuide from '../assets/style-guide';
import {scaledSize} from '../assets/style-guide/typography';
import {applyStyles} from '../assets/styles';

type HeaderProps = {
  title?: string;
  centerTitle?: boolean;
  goBack?: () => void;
  extraStyles?: StyleProp<StyleSheetProperties | any>;
  extraStylesIcon?: StyleProp<StyleSheetProperties | any>;
  extraStylesText?: StyleProp<StyleSheetProperties | any>;
  children?: any;
};

const Subheader: React.FC<HeaderProps> = ({
  children,
  title,
  centerTitle,
  goBack,
  extraStyles,
  extraStylesIcon = [],
  extraStylesText = [],
}) => {
  return (
    <View
      style={applyStyles(
        {
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: scaledSize(16),
          marginBottom: scaledSize(20),
        },
        centerTitle && styles.headerParentContainer,
      )}>
      <View style={[styles.headerContainer, extraStyles]}>
        {goBack && (
          <TouchableOpacity onPress={goBack}>
            <MaterialIcons
              style={[styles.iconStyle, ...extraStylesIcon]}
              name="arrow-back"
              size={scaleWidth(24)}
            />
          </TouchableOpacity>
        )}
        {title && (
          <Text style={[styles.header, ...extraStylesText]}>{title}</Text>
        )}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  headerParentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    color: StyleGuide.Colors.primary,
    marginRight: Platform.OS === 'ios' ? scaledSize(28) : scaledSize(32),
  },
  header: {
    fontSize: scaledSize(20),
    lineHeight: scaledSize(23),
    color: StyleGuide.Colors.primary,
    fontWeight: '700',
    fontFamily: 'Inter-Regular',
  },
  subHeader: {
    fontSize: StyleGuide.Typography[14],
    color: StyleGuide.Colors.shades.grey[200],
    marginTop: scaledSize(5),
  },
});

export default Subheader;
