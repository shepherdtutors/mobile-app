import React, {useRef} from 'react';
import {ViewComponent} from 'react-native';

type Props = {};
type ReturnType = {
  ref: React.RefObject<any>;
};

function useLogic({}: Props = {}): ReturnType {
  const ref = useRef<ViewComponent>();

  return {
    ref,
  };
}

export default useLogic;
