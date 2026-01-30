import { memo, useRef } from 'react';
import { Keyboard } from 'react-native';
import { BottomSheetRef } from '@app/components/BottomSheet/props';
import CloseIcon from '@assets/icons/close.svg';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTokens, Stack, XStack } from 'tamagui';

import Button from '../Button';
import TextNode from '../TextNode';
import TouchableOpacity from '../TouchableOpacity';
import BottomSheetContentProps from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const BottomSheetContentView = (props: BottomSheetContentProps) => {
  const {
    children,
    showHandler = false,
    showConfirmButton = true,
    showCancelButton = false,
    buttonContainerProps,
    containerProps,
    tx,
    title,
    titleContainerProps,
    onModalClose,
    onConfirm,
    onCancel,
    CancelButtonProps,
    ConfirmButtonProps,
  } = props;

  // #region ============== HOOKS
  const insets = useSafeAreaInsets();
  const localRef = useRef<BottomSheetRef>(null);

  // #endregion

  // #region ============== VARIABLES
  // const defaultIndex = defaultOpen ? 0 : -1;
  const colorTokens = getTokens()?.color;
  // #endregion

  // #region ============== VIEWS

  const renderHeaderComponent = () => {
    const titleVisible = tx || title;
    return (
      <XStack alignItems="center" justifyContent="space-between" {...titleContainerProps}>
        {titleVisible ? (
          <TextNode flex={1} preset="subheading" tx={tx}>
            {title}
          </TextNode>
        ) : (
          <Stack />
        )}
        <TouchableOpacity
          hitSlop={30}
          onPress={() => {
            onModalClose?.();
          }}
        >
          <CloseIcon color={colorTokens?.$secondaryText?.val} />
        </TouchableOpacity>
      </XStack>
    );
  };

  const renderActionButton = () => {
    // if (!isActionButtonVisible) return null;
    return (
      <Stack flexDirection="row" alignItems="center" gap="$sm" {...buttonContainerProps}>
        {showCancelButton && (
          <Button
            variant="outlined"
            tx="common:button.cancel"
            onPress={() => {
              onCancel?.();
              localRef?.current?.dismiss();
            }}
            {...CancelButtonProps}
          />
        )}
        {showConfirmButton && (
          <Button
            tx="common:button.confirm"
            onPress={() => {
              if (Keyboard.isVisible()) {
                Keyboard.dismiss();
                localRef?.current?.snapToIndex(0);
              }
              onConfirm?.();
            }}
            containerStyle={{
              flex: 1,
            }}
            {...ConfirmButtonProps}
          />
        )}
      </Stack>
    );
  };

  return (
    <BottomSheetScrollView
      style={{
        paddingBottom: insets?.bottom,
      }}
    >
      <Stack
        gap="$xl"
        padding="$screenPadding"
        paddingTop={showHandler ? 0 : '$screenPadding'}
        {...containerProps}
      >
        {renderHeaderComponent()}
        {children}
        {renderActionButton()}
      </Stack>
    </BottomSheetScrollView>
  );
  // #endregion
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const BottomSheetContent = memo(BottomSheetContentView);
export * from './props';
export default BottomSheetContent;
