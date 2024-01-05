import {applyFontSize, applySpacing, dimensions, spacing} from './variables';
import {StyleSheet} from 'react-native';
import {appendPrefix} from './utils';
import {flattenObject} from '../../utils';
import Colors from '../style-guide/colors';

const flattenedColors = flattenObject(Colors);

export const globalStyles: {[key: string]: any} = StyleSheet.create({
  ...appendPrefix('flex', {
    row: {
      flexDirection: 'row',
    },
    col: {
      flexDirection: 'column',
    },
    'row-reverse': {
      flexDirection: 'row-reverse',
    },
    'col-reverse': {
      flexDirection: 'column-reverse',
    },
  }),
  'justify-start': {
    justifyContent: 'flex-start',
  },
  'justify-center': {
    justifyContent: 'center',
  },
  'justify-end': {
    justifyContent: 'flex-end',
  },
  'justify-between': {
    justifyContent: 'space-between',
  },
  'justify-around': {
    justifyContent: 'space-around',
  },
  'items-start': {
    alignItems: 'flex-start',
  },
  'items-center': {
    alignItems: 'center',
  },
  'items-end': {
    alignItems: 'flex-end',
  },
  'self-start': {
    alignSelf: 'flex-start',
  },
  'self-center': {
    alignSelf: 'center',
  },
  'self-end': {
    alignSelf: 'flex-end',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  'flex-wrap': {
    flexWrap: 'wrap',
  },
  'flex-wrap-reverse': {
    flexWrap: 'wrap-reverse',
  },
  'flex-nowrap': {
    flexWrap: 'nowrap',
  },
  'flex-0': {
    flex: 0,
  },
  'flex-1': {
    flex: 1,
  },
  'grow-0': {
    flexGrow: 0,
  },
  grow: {
    flexGrow: 1,
  },
  'shrink-0': {
    flexShrink: 0,
  },
  shrink: {
    flexShrink: 1,
  },
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
  },
  'w-full': {
    width: '100%',
  },

  // one-half
  'w-1/2': {
    width: '50%',
  },
  // one-third
  'w-1/3': {
    width: '33.333333%',
  },
  'w-2/3': {
    width: '66.666667%',
  },
  // one-fourth
  'w-1/4': {width: '25%'},
  'w-2/4': {width: '50%'},
  'w-3/4': {width: '75%'},

  // one-fifth
  'w-1/5': {width: '20%'},
  'w-2/5': {width: '40%'},
  'w-3/5': {width: '60%'},
  'w-4/5': {width: '80%'},

  // one-sixth
  'w-1/6': {width: '16.666667%'},
  'w-2/6': {width: '33.333333%'},
  'w-3/6': {width: '50%'},
  'w-4/6': {width: '66.666667%'},
  'w-5/6': {width: '83.333333%'},

  // one-twelfth
  'w-1/12': {width: '25%'},
  'w-2/12': {width: '50%'},
  'w-3/12': {width: '75%'},
  'w-4/12': {width: '20%'},
  'w-5/12': {width: '40%'},
  'w-6/12': {width: '60%'},
  'w-7/12': {width: '80%'},
  'w-8/12': {width: '16.666667%'},
  'w-9/12': {width: '33.333333%'},
  'w-10/12': {width: '50%'},
  'w-11/12': {width: '66.666667%'},

  // one-hundred
  'w-screen': {
    width: dimensions.fullWidth,
  },
  'w-auto': {
    width: 'auto',
  },

  'h-full': {
    height: '100%',
  },

  // one-half
  'h-1/2': {
    height: '50%',
  },
  // one-third
  'h-1/3': {
    height: '33.333333%',
  },
  'h-2/3': {
    height: '66.666667%',
  },
  // one-fourth
  'h-1/4': {height: '25%'},
  'h-2/4': {height: '50%'},
  'h-3/4': {height: '75%'},

  // one-fifth
  'h-1/5': {height: '20%'},
  'h-2/5': {height: '40%'},
  'h-3/5': {height: '60%'},
  'h-4/5': {height: '80%'},

  // one-sixth
  'h-1/6': {height: '16.666667%'},
  'h-2/6': {height: '33.333333%'},
  'h-3/6': {height: '50%'},
  'h-4/6': {height: '66.666667%'},
  'h-5/6': {height: '83.333333%'},

  // one-twelfth
  'h-1/12': {height: '25%'},
  'h-2/12': {height: '50%'},
  'h-3/12': {height: '75%'},
  'h-4/12': {height: '20%'},
  'h-5/12': {height: '40%'},
  'h-6/12': {height: '60%'},
  'h-7/12': {height: '80%'},
  'h-8/12': {height: '16.666667%'},
  'h-9/12': {height: '33.333333%'},
  'h-10/12': {height: '50%'},
  'h-11/12': {height: '66.666667%'},

  // one-hundred
  'h-screen': {
    height: dimensions.fullHeight,
  },
  'text-center': {
    textAlign: 'center',
  },
  'text-left': {
    textAlign: 'left',
  },
  'text-right': {
    textAlign: 'right',
  },
  'text-justify': {
    textAlign: 'justify',
  },
  'text-uppercase': {
    textTransform: 'uppercase',
  },
  'text-capitalize': {
    textTransform: 'capitalize',
  },
  'text-4xl': {
    fontSize: applyFontSize(36),
    lineHeight: applyFontSize(44),
  },
  'text-3xl': {
    fontSize: applyFontSize(32),
    lineHeight: applyFontSize(40),
  },
  'text-2xl': {
    fontSize: applyFontSize(24),
    lineHeight: applyFontSize(32),
  },
  'text-xl': {
    fontSize: applyFontSize(20),
    lineHeight: applyFontSize(24),
  },
  'text-lg': {
    fontSize: applyFontSize(18),
    lineHeight: applyFontSize(24),
  },
  'text-base': {
    fontSize: applyFontSize(16),
    lineHeight: applyFontSize(20),
  },
  'text-sm': {
    fontSize: applyFontSize(14),
    lineHeight: applyFontSize(20),
  },
  'text-xs': {
    fontSize: applyFontSize(12),
    lineHeight: applyFontSize(16),
  },
  'text-xxs': {
    fontSize: applyFontSize(10),
    lineHeight: applyFontSize(16),
  },
  'font-normal': {
    fontWeight: 'normal',
  },
  'font-500': {
    fontWeight: '500',
  },
  'font-bold': {
    fontWeight: 'bold',
  },
  'text-300': {
    fontFamily: 'Inter-Light',
  },
  'text-400': {
    fontFamily: 'Inter-Regular',
  },
  'text-500': {
    fontFamily: 'Inter-Medium',
  },
  'text-600': {
    fontFamily: 'Inter-SemiBold',
  },
  'text-700': {
    fontFamily: 'Inter-Bold',
  },
  'body-300': {
    fontFamily: 'Rubik-Light',
  },
  'body-400': {
    fontFamily: 'Rubik-Regular',
  },
  'body-500': {
    fontFamily: 'Rubik-Medium',
  },
  'body-700': {
    fontFamily: 'Rubik-Bold',
  },
  'body-900': {
    fontFamily: 'Rubik-Black',
  },
  'heading-100': {
    fontFamily: 'Satoshi-Thin',
  },
  'heading-300': {
    fontFamily: 'Satoshi-UltraLight',
  },
  'heading-400': {
    fontFamily: 'Satoshi-Light',
  },
  'heading-500': {
    fontFamily: 'Satoshi-SemiLight',
  },
  'heading-700': {
    fontFamily: 'Satoshi-Regular',
  },
  'print-text-400': {
    fontFamily: 'VT323-Regular',
  },
  'overflow-hidden': {
    overflow: 'hidden',
  },
  'opacity-0': {
    opacity: 0,
  },
  'opacity-25': {
    opacity: 25,
  },
  'opacity-50': {
    opacity: 50,
  },
  'opacity-75': {
    opacity: 75,
  },
  'opacity-100': {
    opacity: 100,
  },
  ...Object.keys(spacing).reduce((acc, curr) => {
    return {
      ...acc,
      // padding
      [`p-${curr}`]: {padding: applySpacing(curr)},
      [`py-${curr}`]: {paddingVertical: applySpacing(curr)},
      [`px-${curr}`]: {paddingHorizontal: applySpacing(curr)},
      [`pt-${curr}`]: {paddingTop: applySpacing(curr)},
      [`pb-${curr}`]: {paddingBottom: applySpacing(curr)},
      [`pl-${curr}`]: {paddingLeft: applySpacing(curr)},
      [`pr-${curr}`]: {paddingRight: applySpacing(curr)},

      // margin
      [`m-${curr}`]: {margin: applySpacing(curr)},
      [`my-${curr}`]: {marginVertical: applySpacing(curr)},
      [`mx-${curr}`]: {marginHorizontal: applySpacing(curr)},
      [`mt-${curr}`]: {marginTop: applySpacing(curr)},
      [`mb-${curr}`]: {marginBottom: applySpacing(curr)},
      [`ml-${curr}`]: {marginLeft: applySpacing(curr)},
      [`mr-${curr}`]: {marginRight: applySpacing(curr)},

      // height
      [`h-${curr}`]: {height: applySpacing(curr)},

      // width
      [`w-${curr}`]: {width: applySpacing(curr)},

      // border
      [`rounded-${curr}`]: {borderRadius: applySpacing(curr)},
      [`border-${curr}`]: {borderWidth: applySpacing(curr)},
      [`border-t-${curr}`]: {borderTopWidth: applySpacing(curr)},
      [`border-b-${curr}`]: {borderBottomWidth: applySpacing(curr)},

      // line-height
      [`leading-${curr}`]: {lineHeight: applySpacing(curr)},

      // positions
      [`top-${curr}`]: {top: applySpacing(curr)},
      [`-top-${curr}`]: {top: applySpacing(curr) * -1},
      [`right-${curr}`]: {right: applySpacing(curr)},
      [`-right-${curr}`]: {right: applySpacing(curr) * -1},
      [`bottom-${curr}`]: {bottom: applySpacing(curr)},
      [`-bottom-${curr}`]: {bottom: applySpacing(curr) * -1},
      [`left-${curr}`]: {left: applySpacing(curr)},
      [`-left-${curr}`]: {left: applySpacing(curr) * -1},
    };
  }, {}),
  ...Object.keys(flattenedColors).reduce((acc, curr) => {
    return {
      ...acc,
      [`bg-${curr}`]: {backgroundColor: flattenedColors[curr]},
      [`text-${curr}`]: {color: flattenedColors[curr]},
      [`border-${curr}`]: {borderColor: flattenedColors[curr]},
      [`border-t-${curr}`]: {borderTopColor: flattenedColors[curr]},
      [`border-b-${curr}`]: {borderBottomColor: flattenedColors[curr]},
    };
  }, {}),
  ...[0, 1, 2, 3, 4].reduce((acc, curr) => {
    return {
      ...acc,
      [`elevation-${curr}`]: {elevation: curr},
    };
  }, {}),
  uppercase: {
    textTransform: 'uppercase',
  },
  lowercase: {
    textTransform: 'lowercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  'normal-case': {
    textTransform: 'none',
  },
  'z-0': {
    zIndex: 0,
  },
  'z-10': {
    zIndex: 0,
  },
  'z-20': {
    zIndex: 20,
  },
  'z-30': {
    zIndex: 30,
  },
  'z-40': {
    zIndex: 40,
  },
  'z-50': {
    zIndex: 50,
  },
});
