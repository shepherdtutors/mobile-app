import {useRef} from 'react';
import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const useCustomNavigationRef = () => {
  const routeNameRef = useRef();

  function navigate(name: string, params?: any) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  }

  return {routeNameRef, navigate};
};

export default useCustomNavigationRef;
