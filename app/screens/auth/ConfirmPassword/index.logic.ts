import React, {useRef} from 'react';
import {ViewComponent} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useToggle} from 'usehooks-ts';

type Props = {};
type ReturnType = {
  ref: React.RefObject<any>;
  handleRouteToLogin: () => void;
  isVisible: boolean;
  toggleVisiblity: () => void;
  isVisibleConfirmPassword: boolean;
  toggleVisiblityConfirmPassword: () => void;
  reset_password: boolean;
};

function useLogic({}: Props = {}): ReturnType {
  const navigation = useNavigation();
  const route = useRoute();
  const ref = useRef<ViewComponent>();
  const [isVisible, toggleVisiblity] = useToggle(true);
  const [isVisibleConfirmPassword, toggleVisiblityConfirmPassword] =
    useToggle(true);

  const {reset_password = false} = route.params;

  const handleRouteToLogin = () => navigation.navigate('Login');

  return {
    ref,
    handleRouteToLogin,
    isVisible,
    toggleVisiblity,
    isVisibleConfirmPassword,
    toggleVisiblityConfirmPassword,
    reset_password,
  };
}

export default useLogic;
