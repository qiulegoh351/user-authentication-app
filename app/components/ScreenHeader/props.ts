import { StackProps } from 'tamagui';

import { TextProps } from '../Text';

export type ScreenHeaderProps = {
  containerProps?: StackProps;
  children?: React.ReactNode;
  backButton?: boolean;
  title?: string;
  tx?: TextProps['tx'];
  right?: false | React.ReactElement;
  extra?: React.ReactElement;
  titleAlign?: 'left' | 'center';
  onPressBack?: () => void;
};
