import { OpaqueColorValue } from 'react-native';
import { GetThemeValueForKey } from 'tamagui';

import { ButtonVariant } from './props';
import { BUTTON_COLORS } from './settings';

export const createButtonTheme = (props: {
  variant: ButtonVariant;
  disabled: boolean;
  color?: GetThemeValueForKey<'backgroundColor'> | OpaqueColorValue;
  isHover?: boolean;
}) => {
  const { variant, disabled, color, isHover = false } = props;

  let colorTheme = '$secondary50';
  let borderTheme = {};
  let spinnerColor = '#FFFFFF';
  let hoverColor = BUTTON_COLORS.HOVER_CONTAINED;
  let hoverBorder = {
    borderColor: 'transparent',
    borderWidth: 1,
  };

  switch (variant) {
    case 'text':
      colorTheme = '$primary500';
      spinnerColor = '#202020';
      break;

    case 'outlined':
      colorTheme = isHover || disabled ? BUTTON_COLORS.HOVER_CONTAINED : '$primary100';
      borderTheme = {
        borderWidth: 1,
        borderColor: '$border',
      };
      hoverBorder = {
        ...hoverBorder,
        borderColor: 'rgba(224, 224, 224, .7)',
      };
      spinnerColor = '#BF2228';
      hoverColor = BUTTON_COLORS.HOVER_OUTLINED;
      break;
    case 'contained':
    default:
      if (disabled) {
        colorTheme = 'white';
      }
      break;
  }

  return {
    color: color ?? colorTheme,
    border: borderTheme,
    spinnerColor,
    hoverColor,
    hoverBorder,
  };
};
