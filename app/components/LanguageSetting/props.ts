import { GetThemeValueForKey, SpinnerProps, StackProps } from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type LanguageSettingProps = {
  containerProps?: StackProps;
  SpinnerProps?: SpinnerProps;
  color?: 'unset' | GetThemeValueForKey<'color'>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default LanguageSettingProps;
