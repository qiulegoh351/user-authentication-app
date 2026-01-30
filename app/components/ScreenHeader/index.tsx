import { memo } from 'react';
import ChevronLeft from '@assets/icons/chevron-left.svg';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, XStack } from 'tamagui';

import { ScreenHeaderProps } from './props';
import { Text, TextProps } from '../Text';
import { DEFAUL_HEADER_HEIGHT } from './settings';
import TouchableOpacity from '../TouchableOpacity';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const ScreenHeaderView: React.FC<ScreenHeaderProps> = (props) => {
  const {
    right,
    backButton = true,
    title = '',
    extra,
    tx,
    containerProps,
    titleAlign = 'left',
    onPressBack,
  } = props;

  // ====================== HOOKS
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // ====================== VARIABLES
  const titleProps: TextProps = {
    tx,
    color: 'white',
    fontWeight: '$600',
    fontSize: '$lg',
  };

  // ====================== EVENTS
  const onPressBackInner = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  // ====================== VIEWS
  return (
    <Stack>
      <XStack
        backgroundColor={'$primary100'}
        paddingHorizontal={'$screenPadding'}
        height={DEFAUL_HEADER_HEIGHT + insets?.top}
        paddingTop={insets?.top}
        justifyContent="center"
        alignItems="center"
        gap={'$xl'}
        {...containerProps}
      >
        <XStack flex={1} gap={'$screenPadding'} alignItems="center">
          {backButton && (
            <TouchableOpacity hitSlop={30} onPress={onPressBack ?? onPressBackInner}>
              <ChevronLeft color="white" />
            </TouchableOpacity>
          )}
          {titleAlign === 'left' && <Text text={title} {...titleProps} />}
        </XStack>

        {right}

        {titleAlign === 'center' && (
          <Stack
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: insets.top,
              bottom: 0,
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Text text={title} {...titleProps} />
          </Stack>
        )}
      </XStack>
      {extra}
    </Stack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const ScreenHeader = memo(ScreenHeaderView);
export default ScreenHeader;
export * from './props';
