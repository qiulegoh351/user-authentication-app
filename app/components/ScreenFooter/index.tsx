import { memo } from 'react';
import { View } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
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
    const paddingBottom = interpolate(
      progress.value,
      [0, 1],
      [safeArea ? insets.bottom + spaceTokens.$xl.val : spaceTokens.$xl.val, spaceTokens.$xl.val],
      Extrapolation.CLAMP,
    );
    return { paddingBottom };
  }, []);

  // =============== VIEWS
  return (
    <View style={presetStyle}>
      <AnimatedStack
        {...containerProps}
        style={[
          animatedStyle,
          {
            paddingHorizontal: spaceTokens.$screenPadding.val,
            paddingVertical: spaceTokens.$xl.val,
          },
          containerProps?.style,
        ]}
      >
        {children && children}
      </AnimatedStack>
    </View>
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
