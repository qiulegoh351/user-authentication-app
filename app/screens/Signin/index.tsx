import { FC } from 'react';
import { Button, Screen, ScreenFooter, ScreenHeader, Text } from '@app/components';
import { Input, Stack } from 'tamagui';

import SigninScreenProps from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const SigninScreen: FC<SigninScreenProps> = ({ navigation }) => {
  // =============== HOOKS

  // =============== VARIABLES

  // =============== EVENTS

  // =============== EFFECTS

  // =============== VIEWS
  return (
    <Screen
      StickyFooter={
        <ScreenFooter>
          <Button
            tx="common:button.login"
            onPress={() => navigation.navigate('BottomTab', { screen: 'Home' })}
          />
        </ScreenFooter>
      }
      StickyHeader={<ScreenHeader backButton={false} title="Sign In" />}
      preset="scroll"
    >
      <Stack gap="$2xl">
        <Text>Test</Text>
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
export default SigninScreen;
