import React, {useRef} from 'react';
import {toInteger} from 'lodash';

import {ViewComponent} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {openInbox, InboxOptions} from 'react-native-email-link';
import {useToast} from 'react-native-toast-notifications';

import useAuth from '../../../context/Auth';
import useTimer from '../../../hooks/useTimer';

type Props = {};
type ReturnType = {
  ref: React.RefObject<any>;
  handleRouteToLogin: () => void;
  actionSheetRef: React.RefObject<any>;
  handleShowActionSheet: () => void;
  handleHideActionSheet: () => void;
  handleOpenEmailApp: (
    opt?: InboxOptions | undefined,
  ) => Promise<{app: string; title: string} | null>;
  handleShowResetNotification: () => void;
  finalDisplayTime: string;
  sendOnce: boolean;
  handleResendResetPasswordEmail: (time?: number, sendone?: boolean) => void;
  handleRouteToConfirmPassword: () => void;
};

function useLogic({}: Props = {}): ReturnType {
  const {resendResetPasswordTime} = useAuth();
  const toast = useToast();
  const navigation = useNavigation();
  const ref = useRef<ViewComponent>();
  const actionSheetRef = useRef<ActionSheetRef>();

  const handleRouteToLogin = () => navigation.navigate('Login');
  const handleRouteToConfirmPassword = () =>
    navigation.navigate('ConfirmPassword', {reset_password: true});

  const handleShowActionSheet = () => actionSheetRef?.current?.show();
  const handleHideActionSheet = () => actionSheetRef?.current?.hide();
  const handleOpenEmailApp = () => openInbox();
  const handleShowResetNotification = () =>
    toast.show('Reset link sent successfully', {
      type: 'custom_success_toast',
      animationDuration: 150,
      data: {
        // title: 'Success',
      },
    });

  const {sendOnce, resetTimer, finalDisplayTime} = useTimer({
    sendOnce: false,
    timestamp: toInteger(resendResetPasswordTime),
    timerCallback: async () => {},
  });

  const handleResendResetPasswordEmail = (
    time = toInteger(resendResetPasswordTime),
    sendonce = true,
  ) => resetTimer(time, sendonce);

  return {
    ref,
    handleRouteToLogin,
    actionSheetRef,
    handleShowActionSheet,
    handleHideActionSheet,
    handleOpenEmailApp,
    handleShowResetNotification,
    finalDisplayTime,
    sendOnce,
    handleResendResetPasswordEmail,
    handleRouteToConfirmPassword,
  };
}

export default useLogic;
