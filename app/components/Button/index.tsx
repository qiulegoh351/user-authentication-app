import { memo, useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Button as TMGButton, Stack, getTokens } from 'tamagui';

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
    ...restProps
  } = props;

  // =============== STATE
  const [isHover, setIsHover] = useState(false);

  // =============== VARIABLES
  const borderRadius = getTokens()?.radius?.$2xl?.val;
  const isDisabled = disabled || loading;
  const isDisabledStyle = Boolean(isDisabled && !unstyledDisabled);
  const { spinnerColor, hoverColor, hoverBorder } = createButtonTheme({
    variant,
    disabled: isDisabledStyle,
    color,
    isHover,
  });

  // =============== EVENTS
  const onChangeHover = useCallback(
    (state: boolean) => {
      setIsHover(state);
    },
    [setIsHover],
  );

  // =============== VIEWS
  return (
    <LinearGradient
      colors={isDisabled ? ['#8B1F54', '#7A1A47'] : ['#F94695', '#F13A76']}
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
            <Spinner color={spinnerColor} />
          </Stack>
        ) : (
          children || (
            <Text preset="button" tx={tx} txOptions={txOptions} {...textProps}>
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
