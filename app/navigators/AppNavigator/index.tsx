/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { ComponentProps, useEffect } from 'react';
import { Linking } from 'react-native';
import Config from '@app/config';
import { useAuth } from '@app/context/AuthContext';
import { ErrorBoundary } from '@app/screens/Error/ErrorBoundary';
import { useAppTheme } from '@app/theme/context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { navigationRef, useBackButtonHandler } from '../navigationUtilities';
import { AppStackParamList } from './props';
import { createAuthGroup } from '../Groups';
import linking from './linking';
import BottomTabNavigator from '../BottomTabNavigator';

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const { isAuthenticated } = useAuth();

  const {
    theme: { colors },
  } = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
      initialRouteName={isAuthenticated ? 'BottomTab' : 'Signin'}
    >
      {/* ============== Auth Group */}
      {createAuthGroup({ Stack })}

      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export interface NavigationProps extends Partial<
  ComponentProps<typeof NavigationContainer<AppStackParamList>>
> {}

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme();

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

  useEffect(() => {
    // OPEN DEEP LINK WHEN APP IS KILLED FROM BACKGROUND
    // This will only work if the app is opened from a deep link
    const openDeepLink = async () => {
      const _initialURL = await Linking.getInitialURL();
      // if (initialURL && WEB_URL) {
      //   const deepLink = initialURL?.replace(WEB_URL, 'xx://');
      //   await Linking.openURL(deepLink);
      // }
    };
    openDeepLink();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props} linking={linking}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  );
};
