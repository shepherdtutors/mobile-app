import {Platform, PermissionsAndroid} from 'react-native';
import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import inAppMessaging from '@react-native-firebase/in-app-messaging';

import {saveFcmToken} from '../../context/User';
import {handlePrintToConsole} from '../../utils';

if (Platform.OS === 'android') {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
}

async function bootstrap() {
  await inAppMessaging().setMessagesDisplaySuppressed(true);
}

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    var r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const initializeFB = () => {
  const getToken = async () => {
    try {
      const token = await firebase.messaging().getToken();

      await saveFcmToken({token});
    } catch (error: any) {
      //   console.log(' initializeFB -> getToken =======>> ', error);
      handlePrintToConsole('initializeFB -> getToken =======>> ', error);
    }
  };

  const registerForRemoteMessages = async () => {
    try {
      await firebase.messaging();
      await requestPermissions();
    } catch (error) {
      // console.log('error firebase message ======>> ', error);
      handlePrintToConsole('error firebase message ======>> ', error);
    }
  };

  const requestPermissions = () => {
    firebase
      .messaging()
      .requestPermission()
      .then((status: FirebaseMessagingTypes.AuthorizationStatus) => {
        const enabled =
          status === messaging.AuthorizationStatus.AUTHORIZED ||
          status === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          onMessage();
          handlePrintToConsole('Authorization status:', status);
        }
      })
      .catch(e => console.log(e));
  };

  const onMessage = () => {
    firebase.messaging().onMessage(response => {
      showNotification(response?.notification);
    });
  };

  const showNotification = (notification: any) => {
    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        id: uuidv4(),
        channelId: 'moniee-app-notification',
        title: notification?.title ?? 'New notification',
        message: notification?.body! ?? '',
      });
    } else {
      PushNotificationIOS.addNotificationRequest({
        id: uuidv4(),
        title: notification?.title ?? 'New notification',
        body: notification?.body! ?? '',
      });
    }
  };

  getToken();
  bootstrap();

  if (Platform.OS === 'ios') {
    registerForRemoteMessages();
  } else {
    onMessage();
  }
};

// export {};
