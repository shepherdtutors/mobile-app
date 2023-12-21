import {Dimensions} from 'react-native';
import {toNumber} from 'lodash';
import {BASE_DEVICE_WIDTH, BASE_DEVICE_HEIGHT} from '@env';
const DEVICE_DIMENSIONS = Dimensions.get('window');

const SCALE_8_FONT_SIZE_PERCENTAGE = 0.0124;
const SCALE_10_FONT_SIZE_PERCENTAGE = 0.0156;
const SCALE_12_FONT_SIZE_PERCENTAGE = 0.0189;
const SCALE_14_FONT_SIZE_PERCENTAGE = 0.021;
const SCALE_16_FONT_SIZE_PERCENTAGE = 0.025;
const SCALE_18_FONT_SIZE_PERCENTAGE = 0.029;
const SCALE_36_FONT_SIZE_PERCENTAGE = 0.058;

function calculateFontSize(figmaFontPercentage: number): number {
  return figmaFontPercentage * DEVICE_DIMENSIONS.height;
}

export default {
  8: calculateFontSize(SCALE_8_FONT_SIZE_PERCENTAGE),
  10: calculateFontSize(SCALE_10_FONT_SIZE_PERCENTAGE),
  12: calculateFontSize(SCALE_12_FONT_SIZE_PERCENTAGE),
  14: calculateFontSize(SCALE_14_FONT_SIZE_PERCENTAGE),
  16: calculateFontSize(SCALE_16_FONT_SIZE_PERCENTAGE),
  18: calculateFontSize(SCALE_18_FONT_SIZE_PERCENTAGE),
  36: calculateFontSize(SCALE_36_FONT_SIZE_PERCENTAGE),
};

const {width, height} = DEVICE_DIMENSIONS;

// Use iPhone6 as base size which is 375 x 667
const baseWidth = toNumber(BASE_DEVICE_WIDTH || 360);
const baseHeight = toNumber(BASE_DEVICE_HEIGHT || 800);

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = (size: number) => Math.ceil(size * scale);
export function padding(a: number, b?: number, c?: number, d?: number) {
  if (a && !b && !c && !d) {
    return {
      paddingTop: scaledSize(a),
      paddingRight: scaledSize(a),
      paddingBottom: scaledSize(a),
      paddingLeft: scaledSize(a),
    };
  }

  if (a && b && !c && !d) {
    return {
      paddingTop: scaledSize(a),
      paddingRight: scaledSize(b),
      paddingBottom: scaledSize(a),
      paddingLeft: scaledSize(b),
    };
  }

  if (a && b && c && !d) {
    return {
      paddingTop: scaledSize(a),
      paddingRight: scaledSize(b),
      paddingBottom: scaledSize(c),
      paddingLeft: scaledSize(b),
    };
  }

  if (a && b && c && d) {
    return {
      paddingTop: scaledSize(a),
      paddingRight: scaledSize(b),
      paddingBottom: scaledSize(c),
      paddingLeft: scaledSize(d),
    };
  }

  // return {
  //   paddingTop: scaledSize(a),
  //   paddingRight: scaledSize(b ? b : a),
  //   paddingBottom: scaledSize(c ? c : a),
  //   paddingLeft: scaledSize(d ? d : b ? b : a),
  // };
}
