import { ErrorInfo } from 'react';
import { ScrollView, TextStyle, View, ViewStyle } from 'react-native';
import { Button } from '@app/components/Button';
import { Screen } from '@app/components/Screen';
import { Text } from '@app/components/Text';
import { useAppTheme } from '@app/theme/context';
import type { ThemedStyle } from '@app/theme/types';

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  onReset(): void;
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
  const { themed } = useAppTheme();
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['top', 'bottom']}
      contentContainerStyle={themed($contentContainer)}
    >
      <View style={$topSection}>
        <Text style={themed($heading)} preset="subheading">
          Error
        </Text>
        <Text text="Description" />
      </View>

      <ScrollView
        style={themed($errorSection)}
        contentContainerStyle={themed($errorSectionContentContainer)}
      >
        <Text style={themed($errorContent)} text={`${props.error}`.trim()} />
        <Text
          selectable
          style={themed($errorBacktrace)}
          text={`${props.errorInfo?.componentStack ?? ''}`.trim()}
        />
      </ScrollView>

      <Button style={themed($resetButton)} onPress={props.onReset}>
        Reset
      </Button>
    </Screen>
  );
}

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: 'center',
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  flex: 1,
});

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: 'center',
};

const $heading: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginBottom: spacing.md,
});

const $errorSection: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 2,
  backgroundColor: colors.separator,
  marginVertical: spacing.md,
  borderRadius: 6,
});

const $errorSectionContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
});

const $errorContent: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
});

const $errorBacktrace: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  marginTop: spacing.md,
  color: colors.textDim,
});

const $resetButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.error,
  paddingHorizontal: spacing.xxl,
});
