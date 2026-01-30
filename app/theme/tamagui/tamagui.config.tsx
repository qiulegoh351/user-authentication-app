// the v2 config imports the css driver on web and react-native on native
// for reanimated: @tamagui/config/v2-reanimated
// for react-native only: @tamagui/config/v2-native
import { config } from '@tamagui/config/v2';
import { createTamagui, createTokens } from 'tamagui';

import { color } from './color';
import { tamaguiFont } from './font';
import { radius } from './radius';
import { space } from './space';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const tokens = createTokens({
  ...config?.tokens,
  color,
  fontSize: {
    ...tamaguiFont?.size,
  },
  radius: {
    ...config?.tokens?.radius,
    ...radius,
  },
  space: {
    ...config?.tokens?.space,
    ...space,
  },
});
const appConfig = createTamagui({
  ...config,
  tokens,
  fonts: {
    // for tamagui, heading and body are assumed
    heading: tamaguiFont,
    body: tamaguiFont,
  },
  defaultFont: 'body',
});

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export type TamaguiAppConfig = typeof appConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends TamaguiAppConfig {}
}

export default appConfig;
