import { createContext, useContext, FC, memo, useState, useMemo, useEffect } from 'react';
import { AuthUser, LoginAction, SignupAction, User } from '@app/@types';
import { STORAGE_KEY } from '@app/config/constant';
import { useTranslation } from '@app/i18n';
import { navigationRef } from '@app/navigators';
import { safeJsonParse } from '@app/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { isEmpty } from 'lodash';

import { generateBearerToken, now, sanitizeEmail, uid } from './helper';
import { AuthProviderProps, AuthContextType } from './props';

// --------------------
// Context
// --------------------
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  deleteAccount: () => {},
});

// --------------------
// Provider
// --------------------
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // =================== HOOKS
  const { t } = useTranslation();
  const [user, setUser] = useState<AuthUser | null>(null);

  // =================== VARIABLES
  const isAuthenticated = useMemo(() => !isEmpty(user), [user]);

  // =================== FUNCTIONS
  const login = async (props: LoginAction) => {
    const { data, onError, onSuccess } = props;
    const { email, password } = data;
    const input = {
      email,
      password,
    };
    const usersDb = await AsyncStorage.getItem(STORAGE_KEY.USERS);
    const users = safeJsonParse<User[]>(usersDb, []);
    const user = users.find((u) => sanitizeEmail(u.email) === input.email);
    if (!user || user?.password !== password) {
      onError?.({ message: t('common:label.incorrectCreadentials') });
      return;
    }
    const authUser = {
      ...user,
      token: generateBearerToken(user.email),
    };
    setUser(authUser);
    await AsyncStorage.setItem(STORAGE_KEY.SESSION, JSON.stringify(authUser));
    onSuccess?.();
  };

  const signup = async (props: SignupAction) => {
    const id = uid();
    const { data, onError, onSuccess } = props;
    const { name, email, password } = data;
    const input = {
      id,
      created_at: now(),
      name,
      email: sanitizeEmail(email),
      password,
    };
    const usersDb = await AsyncStorage.getItem(STORAGE_KEY.USERS);
    const users = safeJsonParse<User[]>(usersDb, []);
    const emailTaken = users.some((u) => sanitizeEmail(u.email) === input.email);

    if (emailTaken) {
      onError?.({ message: t('common:label.emailAlreadyTaken') });
      return;
    }

    const newUsers = [input, ...(users || [])];
    await AsyncStorage.setItem(STORAGE_KEY.USERS, JSON.stringify(newUsers));
    onSuccess?.();
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY.SESSION);
    navigationRef?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Signin',
          },
        ],
      }),
    );
    setUser(null);
  };

  const deleteAccount = async () => {
    const usersDb = await AsyncStorage.getItem(STORAGE_KEY.USERS);
    const users = safeJsonParse<User[]>(usersDb, []);
    const newUsers = users.filter((u) => u.id !== user?.id);
    await AsyncStorage.setItem(STORAGE_KEY.USERS, JSON.stringify(newUsers));
    logout();
  };

  // =================== EFFECTS
  useEffect(() => {
    let isMounted = true;

    const hydrateSession = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY.SESSION);
        const session = safeJsonParse<AuthUser | null>(raw, null);

        if (isMounted) {
          setUser(session);
        }
      } catch (error) {
        if (__DEV__) {
          console.warn('Failed to hydrate auth session', error);
        }
      }
    };

    hydrateSession();

    return () => {
      isMounted = false;
    };
  }, []);

  // =================== VIEWS
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// --------------------
export const useAuth = () => useContext(AuthContext);
export default memo(AuthProvider);
