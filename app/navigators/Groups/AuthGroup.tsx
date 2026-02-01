import { SigninScreen, SignupScreen } from '@app/screens';

import { CommonGroupProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const createAuthGroup = (props: CommonGroupProps) => {
  const { Stack } = props;

  // =============== VIEWS
  return (
    <Stack.Group>
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Group>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default createAuthGroup;
