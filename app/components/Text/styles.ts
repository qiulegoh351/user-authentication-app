import { fontTokens } from '@app/theme/tamagui/font';
import { TextProps as TMGTextProps } from 'tamagui';

export type Presets =
  | 'default'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'caption'
  | 'button'
  | 'formLabel'
  | 'formHelper'
  | 'bottomTab';

type FontSizeToken =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 'true'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

type FontSizeMap = {
  [K in FontSizeToken]: number;
};
export const fontSize = fontTokens.size as FontSizeMap;

export const $baseStyle: TMGTextProps = {
  fontSize: '$md',
  color: '$primaryText',
  fontWeight: '$500',
};

export const $presets: Record<Presets, TMGTextProps> = {
  default: $baseStyle,
  heading: {
    ...$baseStyle,
    fontSize: '$2xl',
    fontWeight: '$600',
  },
  subheading: {
    ...$baseStyle,
    fontSize: '$xl',
    fontWeight: '$500',
    color: '$primary500',
  },
  body: $baseStyle,
  caption: {
    ...$baseStyle,
    fontWeight: '$400',
    color: '$secondaryText',
  },
  button: {
    ...$baseStyle,
    textAlign: 'center',
    fontWeight: '$600',
    color: 'white',
  },
  bottomTab: {
    ...$baseStyle,
    fontSize: '$sm',
    fontWeight: '$500',
    textAlign: 'center',
  },
  formLabel: {
    ...$baseStyle,
    fontWeight: '$500',
  },
  formHelper: {
    ...$baseStyle,
    fontSize: '$sm',
    fontWeight: 'normal',
  },
};
