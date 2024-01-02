import {isNil} from 'lodash';

export enum StorageName {
  USER_DETAILS = 'USER_DETAILS',
  USER_ID = 'USER_ID',
}

const StorageNameValue: {
  [key in StorageName]: {
    key: string;
    value?: string | null;
  };
} = {
  [StorageName.USER_DETAILS]: {
    key: 'sherperd_tutors@user-details',
    value: 'passed',
  },
  [StorageName.USER_ID]: {
    key: 'sherperd_tutors@user-id',
    value: null,
  },
};

const StorageNameValueFunc = (name: keyof StorageName, value = undefined) => {
  if (!isNil(value)) {
    return {...StorageNameValue[name], value};
  }
  return {...StorageNameValue[name]};
};

export default StorageNameValueFunc;
