import { PropsWithChildren } from 'react';
import { StackProps } from 'tamagui';

import { Presets } from './styles';

export type ScreenFooterProps = PropsWithChildren<{
  /**
   * Container Props
   */
  containerProps?: StackProps;

  /**
   * Footer safe area
   * @default true
   */
  safeArea?: boolean;

  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
}>;
