import { memo } from 'react';
import { Stack } from 'tamagui';

import { LoaderProps } from './props';
import Spinner from '../Spinner';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const LoaderView: React.FC<LoaderProps> = (props) => {
  const { containerProps, SpinnerProps } = props;
  // =============== VIEWS
  return (
    <Stack
      flex={1}
      padding="$screenPadding"
      alignItems="center"
      justifyContent="center"
      backgroundColor={'white'}
      {...containerProps}
    >
      <Spinner {...SpinnerProps} />
    </Stack>
  );
};

export * from './props';
export const Loader = memo(LoaderView);
export default Loader;
