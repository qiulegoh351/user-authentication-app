import { FC } from 'react';
import { Screen, ScreenHeader, Text } from '@app/components';
import { Input, Stack } from 'tamagui';

import HomeScreenProps from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const HomeScreen: FC<HomeScreenProps> = () => {
  // =============== HOOKS

  // =============== VARIABLES

  // =============== EVENTS

  // =============== EFFECTS

  // =============== VIEWS
  return (
    <Screen StickyHeader={<ScreenHeader title="Home" />} preset="scroll">
      <Stack gap="$2xl">
        <Text>Home</Text>
        <Stack height={300} backgroundColor={'yellow'} />
        <Input backgroundColor="$primary100" />

        <Input backgroundColor="$primary100" />

        <Input backgroundColor="$primary100" />
      </Stack>
    </Screen>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default HomeScreen;
