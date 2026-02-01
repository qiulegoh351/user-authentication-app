import { TextInputProps } from '../TextInput';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type PasswordInputProps = TextInputProps & {
  callbackSecureTextEntry?: () => void;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default PasswordInputProps;
