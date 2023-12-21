import React, {ReactNode} from 'react';
import {Text, Platform} from 'react-native';
import {scaledSize} from '../assets/style-guide/typography';
import {applyStyles} from '../assets/styles';

type TabBarLabelProps = {
  focused: boolean;
  children: ReactNode;
  hidden?: boolean;
};

export const TabBarLabel = ({children, focused, hidden}: TabBarLabelProps) => {
  return (
    <Text
      style={applyStyles(
        focused ? 'text-primary' : 'text-shades-grey-1050',
        // 'uppercase',
        {
          fontSize: Platform.OS === 'ios' ? scaledSize(10) : scaledSize(12),
          // font: scaledSize(17),
          // paddingBottom: scaledSize(12),
          position: 'absolute',
          top: scaledSize(14),
          display: hidden ? 'none' : 'flex',
        },
      )}>
      {children}
    </Text>
  );
};
