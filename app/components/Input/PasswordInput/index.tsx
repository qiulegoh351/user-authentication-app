import { memo, useState } from 'react';
import TextInput from '@app/components/Input/TextInput';
import { TouchableOpacity } from '@app/components/TouchableOpacity';
import Visible from '@assets/icons/password_visibility.svg';
import VisibleOff from '@assets/icons/password_visibility_off.svg';
import { getTokens } from 'tamagui';

import { PasswordInputProps as Props } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const PasswordInputView: React.FC<Props> = (props) => {
  const { bottomSheetTextProps, bottomSheet, callbackSecureTextEntry, ...restProps } = props;
  // =============== HOOKS
  const primaryColor = getTokens()?.color?.$primary500?.val;
  const secondaryColor = getTokens()?.color?.$secondaryText?.val;
  const [showPassword, setShowPassword] = useState(false);

  // =============== VIEWS
  return (
    <TextInput
      {...restProps}
      bottomSheet={bottomSheet}
      secureTextEntry={!showPassword}
      bottomSheetTextProps={{
        secureTextEntry: !showPassword,
        ...bottomSheetTextProps,
      }}
      postfix={
        <TouchableOpacity
          onPress={() => {
            callbackSecureTextEntry?.();
            setShowPassword(!showPassword);
          }}
          hitSlop={28}
          style={{
            marginRight: -6,
          }}
        >
          {showPassword ? <Visible color={primaryColor} /> : <VisibleOff color={secondaryColor} />}
        </TouchableOpacity>
      }
    />
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const PasswordInput = memo(PasswordInputView);
export default PasswordInput;
