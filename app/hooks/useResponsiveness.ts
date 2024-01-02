import {useWindowDimensions} from 'react-native';
import {useMediaQuery} from 'react-responsive';

export function useResponsiveness() {
  const {width, height, fontScale, scale} = useWindowDimensions();
  const isPortrait = useMediaQuery({query: '(orientation: portrait)'});
  const isRetina = useMediaQuery({query: '(min-resolution: 2dppx)'});
  return {
    isPortrait,
    isRetina,
    width,
    height,
    fontScale,
    scale,
  };
}

export default useResponsiveness;
