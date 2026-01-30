import { IS_IOS } from '@app/config/constant';
import { getTokens, InputProps, StackProps } from 'tamagui';

type FormThemeArgs = {
  error?: boolean;
  disabled?: boolean;
  isFocus?: boolean;
};

export const createInputTheme = (args: FormThemeArgs) => {
  const { error, disabled } = args;

  const colorToken = getTokens()?.color;
  const disabledColor = colorToken?.$disabled?.val;
  const inputBg = colorToken?.$inputBg?.val;
  const primaryText = colorToken?.$primaryText?.val;
  const errorText = colorToken?.$errorText?.val;

  const bgProps = (): StackProps => {
    if (disabled) return { backgroundColor: disabledColor };
    return { backgroundColor: inputBg };
  };

  const borderProps = (): StackProps => {
    if (disabled) return { borderColor: 'transparent' };
    if (error) return { borderColor: errorText };
    return { borderColor: inputBg };
  };

  const colorProps = () => {
    if (disabled) return { color: disabledColor };
    // if (error) return { color: '$errorText' };
    return { color: primaryText };
  };

  const textProps = (): InputProps => {
    return {
      letterSpacing: -12 * (-2 / 100),
      fontSize: '$md',
      fontWeight: '$400',
      lineHeight: 1.4 * 14,
      height: 'auto',
      borderWidth: 0,
      borderColor: 'transparent',
      paddingHorizontal: 0,
      includeFontPadding: false,
      paddingVertical: '$lg',
      margin: 0,
      textAlignVertical: 'center',
      placeholderTextColor: '$placeholderText',
      color: '$inputText',
      fontFamily: IS_IOS ? 'PingFang-SC-Regular' : 'NotoSansSC-Regular',
      borderRadius: '$radius.lg',
      cursorColor: '$primaryText',
      backgroundColor: '$inputBg',
      focusStyle: {
        borderWidth: 0,
      },
    };
  };

  return {
    ...borderProps(),
    ...colorProps(),
    ...bgProps(),
    inputTheme: { ...textProps() },
  };
};
