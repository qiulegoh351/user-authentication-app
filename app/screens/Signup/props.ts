import { AppStackScreenProps } from '@app/navigators/AppNavigator/props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type SignupScreenProps = AppStackScreenProps<'Signup'>;

export type SignupFieldValues = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  confirm_password?: string | null;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default SignupScreenProps;
