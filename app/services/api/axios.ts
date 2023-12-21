import axios from 'axios';
import {UPLOAD_API_BASE_URL, API_BASE_URL} from '@env';

// import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
// import perf from '@react-native-firebase/perf';
import {isEmpty, isNil} from 'lodash';

let baseURL = API_BASE_URL;
let uploadBaseURL = UPLOAD_API_BASE_URL;

if (process.env.NODE_ENV === 'development') {
  console.log('API_BASE_URL: ', baseURL);
  console.log('UPLOAD_API_BASE_URL: ', UPLOAD_API_BASE_URL);

  // baseURL = 'https://api.squareme.app/api/v1';
}

export let API = axios.create({
  baseURL,
});

export let UPLOAD_API = axios.create({
  baseURL: uploadBaseURL,
});

API.interceptors.request.use(async function (config: any) {
  try {
    const token = await EncryptedStorage.getItem('@user_token');

    if (!isEmpty(token) || !isNil(token)) {
      // const storedUserState = JSON.parse(userDetails as string);
      const headers = config.headers;
      config.headers = {
        Authorization: `Bearer ${token}`,
        timeout: 60000,
        ...headers,
      };
    }

    // const httpMetric = perf().newHttpMetric(config.url, config.method);
    // config.metadata = {httpMetric};

    // await httpMetric.start();
  } finally {
    return config;
  }
});

API.interceptors.response.use(
  async function (response: any) {
    try {
      // @ts-ignore
      const {httpMetric} = response.config.metadata;

      httpMetric.setHttpResponseCode(response.status);
      httpMetric.setResponseContentType(response.headers['content-type']);

      await httpMetric.stop();
    } finally {
      return response;
    }
  },
  async function (error: any) {
    try {
      const {httpMetric} = error.config.metadata;

      httpMetric.setHttpResponseCode(error.response.status);
      httpMetric.setResponseContentType(error.response.headers['content-type']);

      await httpMetric.stop();
    } finally {
      if (error.response.status === 401) {
      }
      console.log('axios ----->> error.message ======>>', error?.message);
      console.log(
        'axios ----->> error.response.message======>>',
        error?.response?.message,
      );
      return Promise.reject(error);
    }
  },
);
