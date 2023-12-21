import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {isEqual, isEmpty, isNil, toInteger, defaultTo} from 'lodash';
import {SQUAREME_ONESIGNAL_LOGGEDIN_TRIGGER} from '@env';

import useCustomNavigator from '../../hooks/useCustomNavigator';
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
};

export function useProvideAuth() {
  const {navigate} = useCustomNavigator();
  const [ready] = useState(true);
  const [userToken, setUserToken] = useState<null | string>(null);
  const [chosenTheme, setChosenTheme] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isBalanceMasked, setIsBalanceMasked] = useState(true);
  const [showAlert, setShowAlert] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userIsActive, setUserIsActive] = useState<boolean>();

  const onesignal_loggedin_trigger = defaultTo(
    SQUAREME_ONESIGNAL_LOGGEDIN_TRIGGER,
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
    } catch (e) {
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
    } catch (e) {}
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
      } finally {
        setShowAlert(false);
        setUserToken(null);
        setIsFetchingUser(false);
        setUser(null);
        if (typeof callback === 'function') {
          callback();
        }
        await EncryptedStorage.setItem('@welcome_screen', 'passed');
        await EncryptedStorage.setItem('@viewed_refer&earn', 'passed');
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

  const handleSetUser = (fetchUser: User) => {
    if (isEqual(fetchUser, user)) {
      return;
    }
    setUser(fetchUser);
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

  const isRegistrationComplete = (callback?: () => void) => {
    if (!isEmpty(user)) {
      if (Number(user?.tier) < 1) {
        navigate('BankDetails');
        return;
      }
      if (isEmpty(user?.email) || isNil(user?.email)) {
        navigate('EmailDetails');
        return;
      }
    }

    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  const isUserLackingTag = (callback?: () => void) => {
    if (!isEmpty(user) && !isNil(user)) {
      if (
        !isEmpty(user?.email) &&
        toInteger(user?.tier) > 0 &&
        isEmpty(user?.userTag) &&
        isNil(user?.userTag)
      ) {
        navigate('CreateTag');
      }
    }

    if (callback && typeof callback === 'function') {
      callback();
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
      isRegistrationComplete,
      isUserLackingTag,
      isBalanceMasked,
      handleSetIsBalanceMasked,
      onRefresh,
      refreshing,
      userIsActive,
      handleSetUserIsActive,
      showAlert,
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
