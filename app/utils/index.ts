import {Linking, Platform} from 'react-native';
import {isArray, isArrayLike, startsWith, toString} from 'lodash';
export * from './scalers';
// export * from './validation';
// export * from './transformCase';

export const flattenObject = (
  object: {[key: string]: any},
  prefix = '',
  seperator = '-',
) => {
  let result: {[key: string]: string} = {};
  Object.keys(object).forEach(name => {
    const key = `${prefix}${prefix ? seperator : ''}${name}`;
    let value = object[name];
    if (typeof value === 'string') {
      result[key] = value;
    } else if (typeof value === 'object') {
      result = {
        ...result,
        ...flattenObject(value, key),
      };
    }
  });
  return result;
};

export const callNumber = (phone: string) => {
  handlePrintToConsole('callNumber ----> ', [phone]);

  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }

  Linking.openURL(phoneNumber);
};

export const handleCleanMobile = (
  mobile = '',
  country_code = '234',
  prefix = '0',
  position = 0,
): string => {
  let cleanMobile = mobile;
  if (startsWith(mobile, prefix, position)) {
    cleanMobile = country_code + mobile.substring(prefix.length);
  }

  return cleanMobile;
};

export const handlePrintToConsole = (
  displayTitle: string = 'Error',
  error: never[] | unknown = [],
  env: 'development' | 'test' | 'production' = toString('development') as
    | 'development'
    | 'test'
    | 'production',
  passThrought: boolean = false,
) => {
  const printLn = () => {
    const parseToString = (errInfo = error) =>
      typeof errInfo === 'object' ? JSON.stringify(errInfo) : toString(errInfo);
    if (!isArrayLike(error) || !isArray(error)) {
      console.log(displayTitle, parseToString());
    } else {
      error.forEach(item => {
        console.log(displayTitle, parseToString(item));
      });
    }
  };

  if (passThrought) {
    printLn();
  } else {
    if (env === toString(process.env.NODE_ENV)) {
      printLn();
    }
  }
  return;
};
