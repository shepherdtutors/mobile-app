import {isNil} from 'lodash';

export enum StorageName {
  USER_DETAILS,
  USER_ID,
}

const StorageNameValue: {
  -readonly [key in keyof typeof StorageName]: {
    key: string;
    value?: string | null;
  };
} = {
  [StorageName[StorageName.USER_DETAILS]]: {
    key: 'sherperd_tutors@user-details',
    value: 'passed',
  },
  [StorageName[StorageName.USER_ID]]: {
    key: 'sherperd_tutors@user-id',
    value: null,
  },
};

const StorageNameValueFunc = (name: keyof StorageName, value = undefined) => {
  if (!isNil(value)) {
    return {...StorageNameValue[name], value};
  }
  return;
};

export default StorageNameValueFunc;
