import { Text } from '@app/components/Text';
import { ThemeProvider } from '@app/theme/context';
import tamaguiConfig from '@app/theme/tamagui/tamagui.config';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import { TamaguiProvider } from 'tamagui';

/* This is an example component test using react-native-testing-library. For more
 * information on how to write your own, see the documentation here:
 * https://callstack.github.io/react-native-testing-library/ */
const testText = 'Test string';

describe('Text', () => {
  it('should render the component', () => {
    const { getByText } = render(
      <TamaguiProvider config={tamaguiConfig}>
        <ThemeProvider>
          <NavigationContainer>
            <Text text={testText} />
          </NavigationContainer>
        </ThemeProvider>
      </TamaguiProvider>,
    );
    expect(getByText(testText)).toBeDefined();
  });
});
