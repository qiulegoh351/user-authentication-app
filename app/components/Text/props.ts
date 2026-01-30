import { ReactNode } from 'react';
import { TextStyle, StyleProp } from 'react-native';
import { TxKeyPath } from '@app/i18n';
import { TOptions } from 'i18next';
import { TextProps as TMGTextProps } from 'tamagui';

import { Presets } from './styles';

export interface TextProps extends TMGTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions;
  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Max characters or words to display
   */
  max?: number;
  /**
   * @default words
   * Type of max content (characters or words) to display
   */
  maxType?: 'characters' | 'words';
  /**
   * Children components.
   */
  children?: ReactNode;
}
