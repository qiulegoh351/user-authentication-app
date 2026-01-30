import { useRef, useState } from 'react';
import { LayoutChangeEvent, ScrollView, View, ViewStyle } from 'react-native';
import { $styles } from '@app/theme/styles';
import { onEndReachedHandler } from '@app/utils/onEndReachedHandler';
import { useSafeAreaInsetsStyle } from '@app/utils/useSafeAreaInsetsStyle';
import { useScrollToTop } from '@react-navigation/native';
import { SystemBars } from 'react-native-edge-to-edge';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';

import { AutoScreenProps, ScreenPreset, ScreenProps, ScrollScreenProps } from './props';
import Loader from '../Loader';

export const DEFAULT_BOTTOM_OFFSET = 90;

// #region ============== AUTO PRESET
/**
 * @param {ScreenPreset?} preset - The preset to check.
 * @returns {boolean} - Whether the preset is non-scrolling.
 */
function isNonScrolling(preset?: ScreenPreset) {
  return !preset || preset === 'fixed';
}

/**
 * Custom hook that handles the automatic enabling/disabling of scroll ability based on the content size and screen size.
 * @param {UseAutoPresetProps} props - The props for the `useAutoPreset` hook.
 * @returns {{boolean, Function, Function}} - The scroll state, and the `onContentSizeChange` and `onLayout` functions.
 */
function useAutoPreset(props: AutoScreenProps): {
  scrollEnabled: boolean;
  onContentSizeChange: (w: number, h: number) => void;
  onLayout: (e: LayoutChangeEvent) => void;
} {
  const { preset, scrollEnabledToggleThreshold } = props;
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {};

  const scrollViewHeight = useRef<null | number>(null);
  const scrollViewContentHeight = useRef<null | number>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  function updateScrollState() {
    if (scrollViewHeight.current === null || scrollViewContentHeight.current === null) return;

    // check whether content fits the screen then toggle scroll state according to it
    const contentFitsScreen = (function () {
      if (point) {
        return scrollViewContentHeight.current < scrollViewHeight.current - point;
      } else {
        return scrollViewContentHeight.current < scrollViewHeight.current * percent;
      }
    })();

    // content is less than the size of the screen, so we can disable scrolling
    if (scrollEnabled && contentFitsScreen) setScrollEnabled(false);

    // content is greater than the size of the screen, so let's enable scrolling
    if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true);
  }

  /**
   * @param {number} w - The width of the content.
   * @param {number} h - The height of the content.
   */
  function onContentSizeChange(w: number, h: number) {
    // update scroll-view content height
    scrollViewContentHeight.current = h;
    updateScrollState();
  }

  /**
   * @param {LayoutChangeEvent} e = The layout change event.
   */
  function onLayout(e: LayoutChangeEvent) {
    const { height } = e.nativeEvent.layout;
    // update scroll-view  height
    scrollViewHeight.current = height;
    updateScrollState();
  }

  // update scroll state on every render
  if (preset === 'auto') updateScrollState();

  return {
    scrollEnabled: preset === 'auto' ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  };
}
// #endregion

// #region ============== WITHOUT SCROLLING
/**
 * @param {ScreenProps} props - The props for the `ScreenWithoutScrolling` component.
 * @returns {JSX.Element} - The rendered `ScreenWithoutScrolling` component.
 */
function ScreenWithoutScrolling(props: ScreenProps) {
  const { style, contentContainerStyle, loading = false, children } = props;
  return (
    <View style={[$outerStyle, style]}>
      <View style={[{ flex: 1 }, contentContainerStyle]}>{loading ? <Loader /> : children}</View>
    </View>
  );
}
// #endregion

// #region ============== WITH SCROLLING
/**
 * @param {ScreenProps} props - The props for the `ScreenWithScrolling` component.
 * @returns {JSX.Element} - The rendered `ScreenWithScrolling` component.
 */
function ScreenWithScrolling(props: ScreenProps) {
  const {
    children,
    keyboardShouldPersistTaps = 'handled',
    keyboardBottomOffset = DEFAULT_BOTTOM_OFFSET,
    contentContainerStyle,
    scrollViewProps,
    style,
    loading = false,
    onEndReached,
  } = props as ScrollScreenProps;
  const isEndReachedRef = useRef(false);
  const ref = useRef<ScrollView>(null);

  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(props as AutoScreenProps);

  // Add native behavior of pressing the active tab to scroll to the top of the content
  // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref);

  return (
    <KeyboardAwareScrollView
      bottomOffset={keyboardBottomOffset}
      {...{ keyboardShouldPersistTaps, scrollEnabled, ref }}
      {...scrollViewProps}
      onLayout={(e) => {
        onLayout(e);
        scrollViewProps?.onLayout?.(e);
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h);
        scrollViewProps?.onContentSizeChange?.(w, h);
      }}
      style={[$outerStyle, scrollViewProps?.style, style]}
      contentContainerStyle={[
        scrollViewProps?.contentContainerStyle,
        contentContainerStyle,
        { flexGrow: 1 },
      ]}
      overScrollMode="never"
      onScroll={(e) => {
        onEndReachedHandler({
          event: e,
          onEndReached,
          isEndReachedRef,
          onScroll: scrollViewProps?.onScroll,
        });
      }}
    >
      {loading ? <Loader /> : children}
    </KeyboardAwareScrollView>
  );
}
// #endregion

// #region ============== MAIN ENTRY
/**
 * Represents a screen component that provides a consistent layout and behavior for different screen presets.
 * The `Screen` component can be used with different presets such as "fixed", "scroll", or "auto".
 * It handles safe area insets, status bar settings, keyboard avoiding behavior, and scrollability based on the preset.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Screen/}
 * @param {ScreenProps} props - The props for the `Screen` component.
 * @returns {JSX.Element} The rendered `Screen` component.
 */
export function Screen(props: ScreenProps) {
  const {
    backgroundColor,
    keyboardAvoidingViewProps,
    keyboardOffset = 16,
    safeAreaEdges = ['top', 'bottom'],
    systemBarsProps,
    systemBarStyle,
    StickyHeader,
    StickyFooter,
    loading,
  } = props;
  const containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  const renderScreen = () => {
    if (isNonScrolling(props.preset)) {
      return (
        <View style={$styles.flex1}>
          {StickyHeader && StickyHeader}
          <KeyboardAwareScrollView
            bottomOffset={keyboardOffset}
            {...keyboardAvoidingViewProps}
            style={[$styles.flex1, keyboardAvoidingViewProps?.style]}
          >
            <ScreenWithoutScrolling {...props} />
          </KeyboardAwareScrollView>
          {!loading && StickyFooter && StickyFooter}
        </View>
      );
    }
    return (
      <View style={$styles.flex1}>
        {StickyHeader && StickyHeader}
        <ScreenWithScrolling {...props} />
        {!loading && StickyFooter && <KeyboardStickyView>{StickyFooter}</KeyboardStickyView>}
      </View>
    );
  };

  return (
    <View
      style={[
        $containerStyle,
        { backgroundColor: backgroundColor || 'white' },
        {
          ...containerInsets,
          paddingTop: StickyHeader ? 0 : containerInsets?.paddingTop,
          paddingBottom: StickyFooter ? 0 : containerInsets?.paddingBottom,
        },
      ]}
    >
      <SystemBars style={systemBarStyle || 'light'} {...systemBarsProps} />

      {renderScreen()}
    </View>
  );
}

const $containerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

const $outerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};
