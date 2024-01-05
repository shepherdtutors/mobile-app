import React, {useRef} from 'react';
import {ViewComponent} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useToggle} from 'usehooks-ts';

type Props = {};
type ReturnType = {
  ref: React.RefObject<any>;
  handleRouteToRegister: () => void;
  handleRouteToForgotPassword: () => void;
  isVisible: boolean;
  toggleVisiblity: () => void;
};

function useLogic({}: Props = {}): ReturnType {
  const navigation = useNavigation();
  const ref = useRef<ViewComponent>();

  const [isVisible, toggleVisiblity] = useToggle(true);

  const handleRouteToRegister = () => navigation.navigate('Register');
  const handleRouteToForgotPassword = () =>
    navigation.navigate('ForgotPassword');

  // const userDecoder: Decoder<Partial<User>> = Decoder.object({
  //   country_code: Decoder.string,
  //   mobile: Decoder.string.satisfy({
  //     predicate: (arg: string) => {
  //       if ((!isEmpty(arg) && arg.length < 10) || arg.length > 16) {
  //         return false;
  //       }
  //       return true;
  //     },

  //     failureMessage: 'The phone number must be 10 to 16 digits long',
  //   }),
  // });

  return {
    ref,
    handleRouteToRegister,
    handleRouteToForgotPassword,
    isVisible,
    toggleVisiblity,
  };
}

export default useLogic;
