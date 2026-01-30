import { memo } from 'react';
import { getTokens, Spinner as TamaguiSpinner } from 'tamagui';

import { SpinnerProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const SpinnerView: React.FC<SpinnerProps> = (props) => {
  // =============== VARIABLES
  const primaryColor = getTokens()?.color?.$primary100?.val;

  // =============== VIEWS
  return <TamaguiSpinner color={primaryColor} {...props} />;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const Spinner = memo(SpinnerView);
export default Spinner;
