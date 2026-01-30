import { memo } from 'react';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { KeyboardController } from 'react-native-keyboard-controller';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTokens, Stack } from 'tamagui';

import { ScreenFooterProps } from './props';
import { $presets } from './styles';

const AnimatedStack = Animated.createAnimatedComponent(Stack);

/**
 * ===========================
 * MAIN
 * ===========================
 */
const ScreenFooterView: React.FC<ScreenFooterProps> = (props) => {
  const { containerProps, safeArea = true, preset, children } = props;

  // =============== HOOKS
  const insets = useSafeAreaInsets();
  const { progress } = useReanimatedKeyboardAnimation();

  // =============== VARIABLES
  const presetStyle = $presets[preset ?? 'shadow'];
  const spaceTokens = getTokens().space;

  // =============== ANIMATED
  const animatedStyle = useAnimatedStyle(() => {
    const start = safeArea ? insets.bottom + spaceTokens.$xl.val : spaceTokens.$xl.val;
    const end = spaceTokens.$xl.val;
    const paddingBottom = interpolate(progress.value, [0, 1], [start, end], Extrapolation.CLAMP);
    return { paddingBottom };
  }, []);

  // =============== VIEWS
  return (
    <Stack style={presetStyle}>
      <AnimatedStack
        {...containerProps}
        style={[
          animatedStyle,
          {
            paddingHorizontal: spaceTokens.$screenPadding.val,
            paddingVertical: spaceTokens.$2xl.val,
            alignItems: 'center',
          },
          containerProps?.style,
        ]}
        onPress={() => KeyboardController.dismiss()}
      >
        {children && children}
      </AnimatedStack>
    </Stack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const ScreenFooter = memo(ScreenFooterView);
export default ScreenFooter;
