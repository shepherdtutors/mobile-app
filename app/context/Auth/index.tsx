import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Alert, Platform} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isEqual, isEmpty, isNil, defaultTo, toInteger} from 'lodash';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import remoteConfig from '@react-native-firebase/remote-config';
import VersionCheck from 'react-native-version-check';
import useCustomNavigator from '../../hooks/useCustomNavigator';

import {
  SHEPHERD_ONESIGNAL_LOGGEDIN_TRIGGER,
  FORCE_APP_UPDATE,
  RESEND_RESET_PASSWORD_TITLE,
  RESEND_RESET_PASSWORD_TIME,
  SECONDS,
} from '@env';

import {handlePrintToConsole} from '../../utils';

export type User = {
  avatarUrl?: string;
  profile_picture_url?: string;
  dob: string;
  email: null;
  firstName: string;
  lastName: string;
  middleName: string;
  mobile: string;
  tier: number;
  isVerified: boolean;
  onRefresh: () => void;
  refreshing: boolean;
  userIsActive: boolean;
  handleSetUserIsActive: () => void;
  showAlert: boolean;
  userTag?: string;
  id: string | number;
};

export function useProvideAuth() {
  const defaultAppAnalytics = analytics();
  const {navigate} = useCustomNavigator();

  const [ready] = useState(true);
  const [resendResetPasswordTime, setResendResetPasswordTime] = useState(1);
  const [userToken, setUserToken] = useState<null | string>(null);
  const [chosenTheme, setChosenTheme] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isBalanceMasked, setIsBalanceMasked] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userIsActive, setUserIsActive] = useState<boolean>();

  const onesignal_loggedin_trigger = defaultTo(
    SHEPHERD_ONESIGNAL_LOGGEDIN_TRIGGER,
    'userLoggedIn',
  );

  const handleSetIsBalanceMasked = (state: boolean = false) =>
    setIsBalanceMasked(state || !isBalanceMasked);

  const signIn = async () => {
    try {
      const value = await EncryptedStorage.getItem('@user_token');

      if (!isNil(value) || !isEmpty(value)) {
        setUserToken(value);
      } else {
        setUserToken(null);
      }

      await defaultAppAnalytics.logLogin({
        method: 'regular',
      });
    } catch (e: any) {
      crashlytics().recordError(e);
    } finally {
    }
  };
  const signUp = async () => {
    try {
      const value = await EncryptedStorage.getItem('@user_token');
      if (!isNil(value) || !isEmpty(value)) {
        setUserToken(value);
      } else {
        setUserToken(null);
      }
      await defaultAppAnalytics.logSignUp({
        method: 'regular',
      });
    } catch (e: any) {
      crashlytics().recordError(e);
    }
  };

  const clearUserSession = useCallback(
    async (callback?: () => void, clearStorage: boolean = false) => {
      try {
        setIsFetchingUser(true);

        if (clearStorage) {
          await EncryptedStorage.clear();
        } else {
          await EncryptedStorage.removeItem('@user_token');
          await EncryptedStorage.removeItem('user-id');
        }
      } catch (e) {
        handlePrintToConsole('SignOut error ========> ', [e]);
        crashlytics().recordError(e);
      } finally {
        setShowAlert(false);
        setUserToken(null);
        setIsFetchingUser(false);
        setUser(null);
        if (typeof callback === 'function') {
          callback();
        }
        await EncryptedStorage.setItem('@welcome_screen', 'passed');
        await defaultAppAnalytics.logEvent('logout', {
          id: user?.id,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onesignal_loggedin_trigger],
  );

  const signOut = useCallback(
    async (
      action: 'signout' | 'logout' = 'logout',
      clearStorage = false,
      showAlertPrompt = true,
    ) => {
      if (action === 'logout') {
        await clearUserSession(() => {
          setTimeout(() => {
            if (showAlert) {
              if (showAlertPrompt) {
                Alert.alert(
                  'Info',
                  'Your session has timed out, please login again',
                );
              }
            }
          }, 1000);
        }, clearStorage);
        setShowAlert(false);
        return;
      }

      if (action === 'signout') {
        Alert.alert(
          clearStorage ? 'Sign out' : 'Logout',
          clearStorage
            ? "You're signing out, are you sure?"
            : "You're leaving, are you sure?",
          [
            {
              text: 'Continue',
              onPress: async () => {
                await clearUserSession(() => {}, clearStorage);
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        );
        return;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      showAlert,
      //  fireEvent,
      clearUserSession,
    ],
  );
  const colourTheme = async (value: string) => {
    try {
      if (value === 'landing-page') {
        setChosenTheme(0);
      } else {
        setChosenTheme(1);
      }
    } catch (e) {}
  };

  const handleSetUser = async (fetchUser: User) => {
    if (isEqual(fetchUser, user)) {
      return;
    }
    setUser(fetchUser);
    await defaultAppAnalytics.setUserProperties(fetchUser as any);
    await defaultAppAnalytics.setUserId(user?.id as string);
    await crashlytics().setUserId(user?.id as string);
    await crashlytics().setAttributes(fetchUser as any);
    inAppMessaging().setMessagesDisplaySuppressed(false);
  };

  const saveFetchedUser = async (showLoading: boolean = true) => {
    try {
      setIsFetchingUser(showLoading);
    } catch (error: any) {
      await signOut();
    } finally {
      setIsFetchingUser(false);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const value = await EncryptedStorage.getItem('@user_token');
        if (!isNil(value) || !isEmpty(value)) {
          setUserToken(value);
        } else {
          setUserToken(null);
        }
      } catch (e) {}
    })();

    setUserIsActive(true);

    return () => {};
  }, []);

  const handleCheckUpdate = async () => {
    const config = JSON.parse(
      remoteConfig().getValue(FORCE_APP_UPDATE).asString(),
    );

    const latestAppVersionStore = await VersionCheck.getLatestVersion();

    const minimumAppVersion = config?.minimum_app_version;

    VersionCheck.needUpdate({
      currentVersion: VersionCheck.getCurrentVersion(),
      latestVersion: minimumAppVersion ?? latestAppVersionStore,
    }).then(res => {
      if (res.isNeeded) {
        if (Platform.OS === 'ios' && config?.ios === true) {
          // navigate('UpdateApp', {
          //   force_update: config?.force_update,
          // });
        }

        if (Platform.OS === 'android' && config?.android === true) {
          // navigate('UpdateApp', {
          //   force_update: config?.force_update,
          // });
        }
      }
    });
  };

  const handleFetchResetPasswordEmailConfig = async () => {
    const config = await remoteConfig()
      .getValue(RESEND_RESET_PASSWORD_TITLE)
      .asString();

    const resendResetPasswordTimeConfig =
      toInteger(config) ?? toInteger(RESEND_RESET_PASSWORD_TIME);

    setResendResetPasswordTime(
      resendResetPasswordTimeConfig * toInteger(SECONDS),
    );
  };

  useEffect(() => {
    remoteConfig()
      .setDefaults({
        [FORCE_APP_UPDATE]: JSON.stringify({
          minimum_app_version: VersionCheck.getCurrentVersion(),
          force_update: false,
          ios: true,
          android: true,
        }),
        [RESEND_RESET_PASSWORD_TITLE]: toInteger(RESEND_RESET_PASSWORD_TIME),
      })
      .then(() => {
        if (process.env.NODE_ENV === 'development') {
          handlePrintToConsole('RNFB =====>> Default values set.');
        }
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(async fetchedRemotely => {
        await remoteConfig().fetch(300);
        if (fetchedRemotely) {
          await handleCheckUpdate();
          await handleFetchResetPasswordEmailConfig();
        } else {
          handlePrintToConsole('Info', [
            'No configs were fetched from the backend, and the local configs were already activated',
          ]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showAlert === false && !isEmpty(user) && !isNil(user)) {
      setShowAlert(true);
    }
    if (!isEmpty(user)) {
      setUserIsActive(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onRefresh = useCallback((isRefreshing: boolean = false) => {
    if (isRefreshing) {
      setRefreshing(true);
      return;
    }
    setTimeout(() => {
      setRefreshing(false);
    });
  }, []);

  const handleSetUserIsActive = useCallback(
    async (active: boolean) => {
      setUserIsActive(active);
      if (!active) {
        await signOut();
      }
    },
    [signOut],
  );

  return useMemo(
    () => ({
      userToken,
      chosenTheme,
      signIn,
      signUp,
      signOut,
      colourTheme,
      ready,
      user,
      handleSetUser,
      saveFetchedUser,
      isFetchingUser,
      isBalanceMasked,
      handleSetIsBalanceMasked,
      onRefresh,
      refreshing,
      userIsActive,
      handleSetUserIsActive,
      showAlert,
      resendResetPasswordTime,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      user,
      userToken,
      isFetchingUser,
      colourTheme,
      isBalanceMasked,
      userIsActive,
      showAlert,
      signOut,
      showAlert,
      resendResetPasswordTime,
    ],
  );
}

type ContextType = ReturnType<typeof useProvideAuth>;

const AuthContext = createContext({} as ContextType);

export function AuthProvider({children}: {children: ReactNode}) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}
