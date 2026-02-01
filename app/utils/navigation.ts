import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export function useScreenFocus(props: { onFocus?: () => void; onBlur?: () => void }) {
  const { onBlur, onFocus } = props ?? {};

  useFocusEffect(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    useCallback(() => {
      onFocus?.();
      return () => {
        onBlur?.();
      };
    }, []),
  );
}
