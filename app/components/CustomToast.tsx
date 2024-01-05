import React from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';

import {isEmpty} from 'lodash';
import {ToastType} from 'react-native-toast-notifications';

import Icon from './Icon';
import {applyStyles} from '../assets/styles';
import {scaledSize} from '../assets/style-guide/typography';
import StyleGuide from '../assets/style-guide';
import {scaleHeight} from '../utils';

type ToastProps = {
  variant?: 'custom' | 'success' | 'warning' | 'error';
  toast: ToastType & {
    onHide?: () => void;
    data: {title: string};
    message: string;
    show?: (val: any) => void;
    update?: (val: any) => void;
    hide?: (val: any) => void;
    hideAll?: (val: any) => void;
  };
};

export const ShepherdCustomToast = ({
  toast,
  variant = 'custom',
}: ToastProps) => {
  return (
    <View
      style={applyStyles(
        {
          width: '95%',
          height: scaleHeight(40),
          backgroundColor: StyleGuide.Colors.shades.magenta[900],
          marginTop: 30,
          borderRadius: 8,
          justifyContent: 'flex-start',
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        },
        variant === 'success' && {
          backgroundColor: StyleGuide.Colors.shades.green[1100],
        },
        variant === 'warning' && {
          backgroundColor: StyleGuide.Colors.shades.orange[400],
        },
        variant === 'error' && {
          backgroundColor: StyleGuide.Colors.shades.red[1050],
        },
      )}>
      <View style={applyStyles('mr-8')}>
        {variant === 'success' && (
          <Icon
            type="material-community-icons"
            name="check-circle"
            size={14}
            color={StyleGuide.Colors.shades.green[1050]}
            onPress={() => toast.onHide && toast.onHide()}
          />
        )}
        {variant === 'error' && (
          <Icon
            type="material-community-icons"
            name="close-circle"
            size={14}
            color={StyleGuide.Colors.shades.red[1000]}
            onPress={() => toast.onHide && toast.onHide()}
          />
        )}
      </View>
      <View>
        {!isEmpty(toast?.data?.title) && (
          <Text
            style={applyStyles(
              {
                fontSize: scaledSize(14),
                color: StyleGuide.Colors.white,
                fontFamily: 'Inter-Bold',
              },
              variant === 'success' && {
                color: StyleGuide.Colors.shades.green[1050],
              },
              variant === 'warning' && {
                backgroundColor: StyleGuide.Colors.shades.orange[400],
              },
              variant === 'error' && {
                backgroundColor: StyleGuide.Colors.shades.red[1000],
              },
            )}>
            {toast?.data?.title}
          </Text>
        )}
        <Text
          style={applyStyles(
            {
              color: StyleGuide.Colors.white,
              fontFamily: 'Inter-Regular',
              fontSize: scaledSize(14),
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: scaledSize(20),
              letterSpacing: -0.05,
            },
            variant === 'success' && {
              color: StyleGuide.Colors.shades.green[1050],
            },
            variant === 'warning' && {
              backgroundColor: StyleGuide.Colors.shades.orange[400],
            },
            variant === 'error' && {
              color: StyleGuide.Colors.shades.red[600],
            },
          )}>
          {toast?.message}
        </Text>
      </View>
    </View>
  );
};

export default ShepherdCustomToast;
