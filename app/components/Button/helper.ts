import { OpaqueColorValue } from 'react-native';
import { LinearGradientProps } from 'expo-linear-gradient';
import { GetThemeValueForKey, getTokens } from 'tamagui';

import ButtonProps, { ButtonVariant } from './props';
import { BUTTON_COLORS } from './settings';

export const createButtonTheme = (props: {
  variant: ButtonVariant;
  disabled: boolean;
  color?: GetThemeValueForKey<'backgroundColor'> | OpaqueColorValue;
  isHover?: boolean;
  linearGradient?: ButtonProps['linearGradient'];
  backgroundColor?: ButtonProps['backgroundColor'];
  hoverColor?: ButtonProps['hoverColor'];
}) => {
  const {
    variant,
    disabled,
    color,
    isHover = false,
    linearGradient,
    hoverColor: hoverColorProp,
    backgroundColor: backgroundColorProp,
  } = props;

  const colorTokens = getTokens()?.color;
  let textColor = color || 'white';
  let borderTheme = {};
  let hoverColor = hoverColorProp ?? BUTTON_COLORS.HOVER_CONTAINED;
  let hoverBorder = {
    borderColor: 'transparent',
    borderWidth: 1.5,
  };
  let linearGradientColors: LinearGradientProps['colors'] = [
    colorTokens?.primary500?.val,
    colorTokens?.primary500?.val,
  ];

  switch (variant) {
    case 'text':
      hoverColor = 'transparent';
      borderTheme = {
        borderWidth: 0,
      };
      hoverBorder = {
        borderColor: 'transparent',
        borderWidth: 0,
      };
      textColor = color || '$primaryText';
      if (isHover) {
        textColor = hoverColorProp || '$secondary400';
      }
      linearGradientColors = ['transparent', 'transparent'];
      break;

    case 'outlined':
      borderTheme = {
        borderWidth: 1.5,
        borderColor: backgroundColorProp || '$primaryText',
      };
      hoverBorder = {
        ...hoverBorder,
        borderColor: hoverColorProp || BUTTON_COLORS.HOVER_OUTLINED,
      };
      textColor = color || '$primaryText';
      if (isHover && hoverColorProp) {
        textColor = hoverColorProp;
      }
      hoverColor = 'transparent';
      linearGradientColors = ['transparent', 'transparent'];
      break;
    case 'contained':
    default:
      borderTheme = {
        borderWidth: 1.5,
        borderColor: backgroundColorProp || '$primary500',
      };
      hoverBorder = {
        ...hoverBorder,
        borderColor: hoverColorProp || BUTTON_COLORS.HOVER_OUTLINED,
      };
      if (backgroundColorProp) {
        linearGradientColors = [backgroundColorProp, backgroundColorProp];
      }
      if (linearGradient?.main) {
        linearGradientColors = linearGradient?.main;
      }
      if (disabled && linearGradient?.disabled) {
        linearGradientColors = linearGradient?.disabled;
      }
      break;
  }

  return {
    textColor,
    border: borderTheme,
    hoverColor,
    hoverBorder,
    linearGradientColors,
  };
};
