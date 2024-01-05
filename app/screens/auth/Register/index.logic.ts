import React, {useRef} from 'react';
import {ViewComponent} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type Props = {};
type ReturnType = {
  ref: React.RefObject<any>;
  handleRouteToLogin: () => void;
  handleRouteToConfirmPassword: () => void;
};

function useLogic({}: Props = {}): ReturnType {
  const navigation = useNavigation();
  const ref = useRef<ViewComponent>();

  const handleRouteToLogin = () => navigation.navigate('Login');
  const handleRouteToConfirmPassword = () =>
    navigation.replace('ConfirmPassword');

  return {
    ref,
    handleRouteToLogin,
    handleRouteToConfirmPassword,
  };
}

export default useLogic;
