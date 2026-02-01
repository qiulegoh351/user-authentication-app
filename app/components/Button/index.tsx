import { memo, useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Button as TMGButton, Stack } from 'tamagui';

import Text from '../Text';
import { createButtonTheme } from './helper';
import ButtonProps from './props';
import Spinner from '../Spinner';
import { $presetStyle } from './styles';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const ButtonView: React.FC<ButtonProps> = (props) => {
  // =============== HOOKS

  // =============== PROPS
  const {
    containerStyle,
    textProps,
    loading,
    disabled,
    startIcon,
    endIcon,
    children,
    variant = 'contained',
    color,
    unstyledDisabled,
    text,
    tx,
    txOptions,
    preset = 'default',
    backgroundColor,
    linearGradient,
    hoverColor: hoverColorProp,
    ...restProps
  } = props;

  // =============== STATE
  const [isHover, setIsHover] = useState(false);

  // =============== VARIABLES
  const borderRadius = 100;
  const isDisabled = disabled || loading;
  const isDisabledStyle = Boolean(isDisabled && !unstyledDisabled);
  const { hoverColor, border, hoverBorder, linearGradientColors, textColor } = createButtonTheme({
    variant,
    disabled: isDisabledStyle,
    color,
    isHover,
    linearGradient,
    backgroundColor,
    hoverColor: hoverColorProp,
  });

  // =============== EVENTS
  const onChangeHover = useCallback(
    (state: boolean) => {
      setIsHover(state);
    },
    [setIsHover],
  );

  // const colors: LinearGradientProps['colors'] = useMemo(() => {
  //   if (isDisabled)
  //     return (
  //       linearGradient?.disabled || [colorTokens?.primary400?.val, colorTokens?.primary400?.val]
  //     );
  //   if (backgroundColor) {
  //     return [backgroundColor, backgroundColor];
  //   }
  //   return linearGradient?.main || [colorTokens?.primary500?.val, colorTokens?.primary500?.val];
  // }, [
  //   backgroundColor,
  //   linearGradient?.main,
  //   linearGradient?.disabled,
  //   isDisabled,
  //   colorTokens?.primary500?.val,
  //   colorTokens?.primary400?.val,
  // ]);

  // =============== VIEWS
  return (
    <LinearGradient
      colors={linearGradientColors}
      locations={[0, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[
        {
          borderRadius,
          opacity: loading ? 0.75 : 1,
        },
        containerStyle,
      ]}
    >
      <TMGButton
        disabled={isDisabled}
        icon={startIcon}
        pressStyle={{
          backgroundColor: hoverColor,
          borderRadius,
          ...hoverBorder,
        }}
        iconAfter={endIcon}
        borderRadius={borderRadius}
        {...border}
        onPressIn={() => onChangeHover(true)}
        onPressOut={() => onChangeHover(false)}
        {...$presetStyle[preset]}
        {...restProps}
        onPress={(event) => {
          $presetStyle[preset]?.onPress?.(event);
          restProps?.onPress?.(event);
        }}
      >
        {loading ? (
          <Stack height={20}>
            <Spinner color={textColor as any} />
          </Stack>
        ) : (
          children || (
            <Text color={textColor} preset="button" tx={tx} txOptions={txOptions} {...textProps}>
              {text}
            </Text>
          )
        )}
      </TMGButton>
    </LinearGradient>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const Button = memo(ButtonView);
export default Button;
