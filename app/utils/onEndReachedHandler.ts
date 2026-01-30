import { RefObject } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type ScrollViewOnEndReachedProps = {
  event: NativeSyntheticEvent<NativeScrollEvent>;
  onEndReachedThreshold?: number;
  isEndReachedRef: RefObject<boolean>;
  onEndReached?: () => void;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

/**
 * Shared scroll handler to detect when user scrolls near the bottom
 */
export function onEndReachedHandler({
  event,
  onEndReached,
  onEndReachedThreshold = 0.1,
  isEndReachedRef,
  onScroll,
}: ScrollViewOnEndReachedProps) {
  const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

  const distanceFromBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height);

  const threshold = contentSize.height * onEndReachedThreshold;

  if (distanceFromBottom <= threshold) {
    if (!isEndReachedRef.current) {
      isEndReachedRef.current = true;
      onEndReached?.();
    }
  } else {
    isEndReachedRef.current = false;
  }

  // Call original onScroll if provided
  onScroll?.(event);
}
