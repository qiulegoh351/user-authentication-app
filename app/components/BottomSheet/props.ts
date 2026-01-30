import { ReactNode } from 'react';
import { BottomSheetModal, BottomSheetProps as BaseProps } from '@gorhom/bottom-sheet';
import { EasingFunction, EasingFunctionFactory, ReduceMotion } from 'react-native-reanimated';
import { StackProps, XStackProps } from 'tamagui';

import ButtonProps from '../Button/props';
import { TextProps } from '../Text/props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
interface TimingConfig {
  duration?: number;
  easing?: EasingFunction | EasingFunctionFactory;
  reduceMotion?: ReduceMotion;
}

type ActionButtonProps = Omit<ButtonProps, 'onPress'> & {
  onPress?: () => void;
};

export type BottomSheetProps = BaseProps & {
  customWrapper?: boolean;
  showHandler?: boolean;
  timingConfig?: TimingConfig;
  onOpenChange?: (state: boolean) => void;

  containerProps?: StackProps;

  /**
   * Title of the bottom sheet
   */
  tx?: TextProps['tx'];
  title?: ReactNode;
  titleContainerProps?: XStackProps;
  titleProps?: TextProps;

  /**
   * Called when modal closed by pressing
   * hardware back button and backdrop component
   * @returns
   */
  onModalClose?: () => void;

  buttonContainerProps?: StackProps;

  /**
   * A flag to control the visibility of the confirm button
   */
  showConfirmButton?: boolean;
  ConfirmButtonProps?: ActionButtonProps;
  onConfirm?: () => void;

  /**
   * A flag to control the visibility of the cancel button
   */
  showCancelButton?: boolean;
  CancelButtonProps?: ActionButtonProps;
  onCancel?: () => void;
};

export type BottomSheetRef = BottomSheetModal & {
  isOpen: boolean;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default BottomSheetProps;
