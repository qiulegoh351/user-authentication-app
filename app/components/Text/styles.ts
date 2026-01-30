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
const fontSize = fontTokens.size as FontSizeMap;

export const $baseStyle: TMGTextProps = {
  fontSize: '$md',
  color: '$primaryText',
  fontWeight: '$400',
  lineHeight: fontSize['md'] * 1.4,
  letterSpacing: -fontSize['md'] * (-2 / 100),
};

export const $presets: Record<Presets, TMGTextProps> = {
  default: $baseStyle,
  heading: {
    ...$baseStyle,
    fontSize: '$2xl',
    fontWeight: '$600',
    lineHeight: fontSize['2xl'] * 1.3,
    letterSpacing: 0,
  },
  subheading: {
    ...$baseStyle,
    fontSize: '$lg',
    fontWeight: '$400',
    lineHeight: fontSize['lg'] * 1.4,
    letterSpacing: -fontSize['lg'] * (-2 / 100),
  },
  body: $baseStyle,
  caption: {
    ...$baseStyle,
    fontWeight: '$400',
    lineHeight: fontSize['md'] * 1.3,
    letterSpacing: -fontSize['md'] * (-2 / 100),
  },
  button: {
    ...$baseStyle,
    lineHeight: fontSize['md'] * 1.3,
    textAlign: 'center',
    fontWeight: '$600',
  },
  bottomTab: {
    ...$baseStyle,
    fontSize: '$sm',
    fontWeight: '$500',
    textAlign: 'center',
    lineHeight: fontSize['sm'] * 1.2,
    letterSpacing: -fontSize['sm'] * (-2 / 100),
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
