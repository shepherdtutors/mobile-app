import React from 'react';
import {StyleSheet, ViewStyle, ScrollView} from 'react-native';
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import {scaledSize} from '../assets/style-guide/typography';
import {scaleHeight, scaleWidth} from '../utils';
import {toString} from 'lodash';
import StyleGuide from '../assets/style-guide';

type Props = {
  children: React.ReactNode;
  refObj: React.RefObject<ActionSheetRef>;
  onClose?: () => void;
  onOpen?: () => void;
  containerStyle?: ViewStyle;
  indicatorStyle?: ViewStyle;
  scrollId?: string;
} & ActionSheetProps;

const MonieeActionSheet = ({
  children,
  refObj,
  onClose,
  onOpen,
  containerStyle,
  indicatorStyle,
  // scrollId = toString(Math.random()),
  ...props
}: Props) => {
  // const scrollHandlers = useScrollHandlers<ScrollView>(scrollId, refObj);

  return (
    <ActionSheet
      onClose={onClose}
      onOpen={onOpen}
      gestureEnabled
      containerStyle={{...styles.containerStyle, ...containerStyle}}
      indicatorStyle={{...styles.indicatorStyle, ...indicatorStyle}}
      ref={refObj}
      {...props}>
      {/* <ScrollView {...scrollHandlers}>{children}</ScrollView> */}
      <ScrollView>{children}</ScrollView>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderTopLeftRadius: scaledSize(16),
    borderTopRightRadius: scaledSize(16),
    paddingTop: scaledSize(12),
  },
  indicatorStyle: {
    width: scaleWidth(40),
    height: scaleHeight(4),
    backgroundColor: StyleGuide.Colors.shades.gray[1300],
  },
});

export default MonieeActionSheet;
