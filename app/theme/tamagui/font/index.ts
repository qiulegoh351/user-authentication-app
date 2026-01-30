import { createFont, GenericFont } from 'tamagui';

export const fontTokens: GenericFont = {
  family: 'Inter',
  size: {
    1: 8,
    2: 11,
    3: 12,
    4: 14,
    5: 16,
    'true': 14,
    '2xs': 10,
    'xs': 10,
    'sm': 12,
    'md': 14,
    'lg': 16,
    'xl': 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  } as const,
  lineHeight: {
    'xs': 16,
    'sm': 18,
    'md': 21,
    'lg': 24,
    'xl': 32,
    '2xl': 34,
    '3xl': 38,
    '4xl': 44,
  },
  weight: {
    // tamagui seems like always start with this default family, it does not work even we use the regular one as default and having face - 300 font weight setting
    100: 100,
    200: 200,
    300: 300,
    400: 400,
    500: 500,
    600: 600,
    700: 700,
    800: 800,
    900: 900,
  },
  letterSpacing: {
    1: 0,
    2: -1,
    // 3 will be -1
  },
  // (native) swap out fonts by face/style
  face: {
    // tamagui seems like always start with this default family, it does not work even we use the regular one as default and having face - 300 font weight setting
    100: {
      normal: 'Inter-Thin',
      italic: 'Inter-ThinItalic',
    },
    200: {
      normal: 'Inter-Light',
      italic: 'Inter-LightItalic',
    },
    300: {
      normal: 'Inter-Light',
      italic: 'Inter-LightItalic',
    },
    400: {
      normal: 'Inter-Regular',
      italic: 'Inter-Italic',
    },
    500: {
      normal: 'Inter-Medium',
      italic: 'Inter-MediumItalic',
    },
    600: {
      normal: 'Inter-SemiBold',
      italic: 'Inter-SemiBoldItalic',
    },
    700: {
      normal: 'Inter-Bold',
      italic: 'Inter-BoldItalic',
    },
    800: {
      normal: 'Inter-Bold',
      italic: 'Inter-BoldItalic',
    },
    900: {
      normal: 'Inter-Black',
      italic: 'Inter-BlackItalic',
    },
  },
};

export const tamaguiFont = createFont(fontTokens);
