import { SigninScreen } from '@app/screens';

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
    </Stack.Group>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default createAuthGroup;
