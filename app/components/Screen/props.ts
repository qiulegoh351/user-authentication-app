import { ReactNode } from 'react';
import { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { ExtendedEdge } from '@app/utils/useSafeAreaInsetsStyle';
import { SystemBarsProps, SystemBarStyle } from 'react-native-edge-to-edge';
import { KeyboardAvoidingViewProps } from 'react-native-keyboard-controller';

export interface BaseScreenProps {
  /**
   * Children components.
   */
  children?: ReactNode;
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[];
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * System bar setting. Defaults to dark.
   */
  systemBarStyle?: SystemBarStyle;
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number;
  /**
   * By how much we scroll up when the keyboard is shown. Defaults to 50.
   */
  keyboardBottomOffset?: number;
  /**
   * Pass any additional props directly to the SystemBars component.
   */
  systemBarsProps?: SystemBarsProps;
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  keyboardAvoidingViewProps?: Omit<KeyboardAvoidingViewProps, 'behavior' | 'contentContainerStyle'>;

  StickyHeader?: React.ReactElement;
  StickyFooter?: React.ReactElement;
}

export interface FixedScreenProps extends BaseScreenProps {
  preset?: 'fixed';
}
export interface ScrollScreenProps extends BaseScreenProps {
  preset?: 'scroll';
  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';
  /**
   * Pass any additional props directly to the ScrollView component.
   */
  scrollViewProps?: ScrollViewProps;

  loading?: boolean;

  onEndReached?: () => void;
}

export interface AutoScreenProps extends Omit<ScrollScreenProps, 'preset'> {
  preset?: 'auto';
  /**
   * Threshold to trigger the automatic disabling/enabling of scroll ability.
   * Defaults to `{ percent: 0.92 }`.
   */
  scrollEnabledToggleThreshold?: { percent?: number; point?: number };

  loading?: boolean;
}

export type ScreenProps = (ScrollScreenProps | FixedScreenProps | AutoScreenProps) & {
  loading?: boolean;
  onEndReached?: () => void;
};

export type ScreenPreset = 'fixed' | 'scroll' | 'auto';
