import { useCallback, useEffect, useRef } from 'react';

export function useSafeTimeout() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const setSafeTimeout = useCallback(
    (fn: () => void, ms?: number) => {
      clear();
      timerRef.current = setTimeout(() => {
        fn();
        timerRef.current = null;
      }, ms || 250);
    },
    [clear],
  );

  useEffect(() => clear, [clear]);

  return { setSafeTimeout, clear };
}
