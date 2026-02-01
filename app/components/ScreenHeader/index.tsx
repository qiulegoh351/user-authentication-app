import { memo } from 'react';
import ChevronLeft from '@assets/icons/arrow-left.svg';
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
    backButton = false,
    title = '',
    bottom,
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
    text: title,
  };

  // ====================== EVENTS
  const onPressBackInner = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  // ====================== VIEWS
  return (
    <Stack backgroundColor={'$primary500'}>
      <XStack
        paddingHorizontal={'$screenPadding'}
        height={DEFAUL_HEADER_HEIGHT + insets?.top}
        paddingTop={insets?.top}
        justifyContent="center"
        alignItems="center"
        gap={'$xl'}
        {...containerProps}
      >
        <XStack flex={1} gap={'$sm'} alignItems="center">
          {backButton && (
            <TouchableOpacity hitSlop={30} onPress={onPressBack ?? onPressBackInner}>
              <ChevronLeft color="white" />
            </TouchableOpacity>
          )}
          {titleAlign === 'left' && (
            <Text
              preset="heading"
              numberOfLines={1}
              color="white"
              flexShrink={1}
              minWidth={0}
              text={title}
              {...titleProps}
            />
          )}
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
            <Text preset="heading" color="white" text={title} {...titleProps} />
          </Stack>
        )}
      </XStack>
      {bottom}
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
