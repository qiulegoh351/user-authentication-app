import { KeyboardController } from 'react-native-keyboard-controller';
import { ButtonProps } from 'tamagui';

export type Preset = 'form' | 'default';

export const $baseStyle: ButtonProps = {
  paddingVertical: '$sm',
  paddingHorizontal: '$xl',
  height: 'auto',
  minHeight: 48,
  backgroundColor: 'transparent',
};

export const $presetStyle: Record<Preset, ButtonProps> = {
  default: $baseStyle,
  form: {
    ...$baseStyle,
    onPress: () => {
      if (KeyboardController.isVisible()) {
        KeyboardController.dismiss();
      }
    },
  },
};
