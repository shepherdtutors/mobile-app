import {isEmpty, map, reduce} from 'lodash';
import {TextStyle, ViewStyle} from 'react-native';
import {Falsy} from '../../types';
import {globalStyles} from './global';

export type ClassName =
  | {[key: string]: any}
  | ViewStyle
  | TextStyle
  | string
  | Falsy;

export const applyStyles = (...styles: ClassName[]): {[key: string]: any} =>
  styles.reduce<{[key: string]: string | Record<string, number | string>}>(
    (acc, curr: any) => {
      if (typeof curr === 'string') {
        const classNames = curr.split(' ');
        if (isEmpty(classNames)) {
          return acc;
        }
        if (!isEmpty(classNames)) {
          const values = map(classNames, className => globalStyles[className]);
          return {
            ...acc,
            ...reduce(values, (acm, cur) => ({...acm, ...cur}), {}),
          };
        }
        // return {...acc, ...applyStyles(...classNames)};
      }
      return {...acc, ...curr};
    },
    {},
  );

export const as = applyStyles;

export const appendPrefix = (
  prefix: string,
  values: {[key: string]: {[key: string]: string | number}},
) => {
  return Object.keys(values).reduce((prevValues, key) => {
    return {
      ...prevValues,
      [`${prefix}-${key}`]: values[key],
    };
  }, {});
};
