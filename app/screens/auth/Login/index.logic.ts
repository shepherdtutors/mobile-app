import React, {useRef} from 'react';
import {ViewComponent} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type Props = {};
type ReturnType = {
  ref: React.RefObject<any>;
  handleRouteToRegister: () => void;
  handleRouteToForgotPassword: () => void;
};

function useLogic({}: Props = {}): ReturnType {
  const navigation = useNavigation();
  const ref = useRef<ViewComponent>();

  const handleRouteToRegister = () => navigation.navigate('Register');
  const handleRouteToForgotPassword = () =>
    navigation.navigate('ForgotPassword');

  return {
    ref,
    handleRouteToRegister,
    handleRouteToForgotPassword,
  };
}

export default useLogic;
