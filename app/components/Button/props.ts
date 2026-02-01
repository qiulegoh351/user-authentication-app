import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';
import { LinearGradientProps } from 'expo-linear-gradient';
import { ButtonProps as TMBButtonProps } from 'tamagui';
import { GetThemeValueForKey } from 'tamagui';

import { TextProps } from '../Text';
import { Preset } from './styles';

export type ButtonVariant = 'outlined' | 'contained' | 'text';

type OmitButtonProps = 'variant' | 'icon' | 'iconAfter' | 'backgroundColor' | 'color';

type ThemeColor = 'unset' | GetThemeValueForKey<'backgroundColor'> | OpaqueColorValue;

export type ButtonProps = Omit<TMBButtonProps, OmitButtonProps> & {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps['tx'];
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps['text'];
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps['txOptions'];

  textProps?: TextProps;

  children?: React.ReactNode;

  color?: ThemeColor;

  disabled?: boolean;

  onPress?: () => void;

  loading?: boolean;
  variant?: ButtonVariant;
  startIcon?: TMBButtonProps['icon'];
  endIcon?: TMBButtonProps['iconAfter'];

  preset?: Preset;
  // backgroundColor?: ThemeColor;
  unstyledDisabled?: boolean;

  containerStyle?: StyleProp<ViewStyle>;

  linearGradient?: {
    main?: LinearGradientProps['colors'];
    disabled?: LinearGradientProps['colors'];
  };

  hoverColor?: string;

  backgroundColor?: string;
};

export default ButtonProps;
