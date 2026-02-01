import { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { useBackHandler } from '@app/utils/useBackHandler';
import {
  BottomSheetModal,
  BottomSheetView as GorhonBottomSheetView,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import { Easing } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTokens, Stack } from 'tamagui';

import { BottomSheetProps, BottomSheetRef } from './props';
import BottomSheetContent from '../BottomSheetContent';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const BottomSheetView = (props: BottomSheetProps, ref: React.ForwardedRef<BottomSheetRef>) => {
  const {
    customWrapper = false,
    snapPoints,
    children,
    showHandler = false,
    timingConfig,
    showConfirmButton = true,
    showCancelButton = false,
    buttonContainerProps,
    containerProps,
    tx,
    title,
    titleContainerProps,
    onChange,
    onOpenChange,
    onModalClose,
    onConfirm,
    onCancel,
    CancelButtonProps,
    ConfirmButtonProps,
    ...bottomSheetProps
  } = props;

  // #region ============== HOOKS
  const insets = useSafeAreaInsets();
  const localRef = useRef<BottomSheetRef>(null);
  const isOpen = useRef<boolean>(false);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 250,
    easing: Easing.elastic(0),
    ...timingConfig,
  });

  useImperativeHandle(ref, () => ({
    ...(localRef.current as BottomSheetRef),
    isOpen: isOpen.current,
  }));

  const sheetSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  useBackHandler({
    onBackPress: () => {
      if (isOpen.current) {
        localRef.current?.dismiss();
        onModalClose?.();
        return true;
      }
      return false;
    },
    dependencies: [isOpen.current],
  });
  // #endregion

  // #region ============== VARIABLES
  // const defaultIndex = defaultOpen ? 0 : -1;
  const colorTokens = getTokens()?.color;
  // #endregion

  // #region ============== EVENTS

  const onChangeHandler: BottomSheetProps['onChange'] = (index, position, type) => {
    const open = index !== -1; // -1 means it's fully closed
    isOpen.current = open;
    if (open) {
      Keyboard.dismiss();
    }
    onOpenChange?.(open);
    onChange?.(index, position, type);
  };

  const onCloseModalHandler = useCallback(() => {
    onModalClose?.();
    localRef?.current?.dismiss();
  }, [onModalClose]);
  // #endregion

  // #region ============== VIEWS
  const renderHandler = () => {
    if (!showHandler) return null;
    return (
      <Stack
        alignSelf="center"
        width="25%"
        height={4}
        marginTop={12}
        marginBottom={12}
        borderRadius={'$full'}
        backgroundColor={showHandler ? '$border' : 'transparent'}
      />
    );
  };

  return (
    <BottomSheetModal
      ref={localRef}
      snapPoints={sheetSnapPoints}
      enableDynamicSizing={true}
      animationConfigs={animationConfigs}
      enablePanDownToClose
      onChange={onChangeHandler}
      handleComponent={() => renderHandler()}
      backgroundStyle={{
        backgroundColor: colorTokens?.$bg?.val,
      }}
      bottomInset={-insets.bottom / 2}
      backdropComponent={() => {
        return (
          <Stack
            opacity={0.5}
            style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]}
            onPress={() => {
              if (Keyboard.isVisible()) {
                Keyboard.dismiss();
                localRef?.current?.snapToIndex(0);
                return;
              }
              onCloseModalHandler();
            }}
          />
        );
        // return (
        //   <BottomSheetBackdrop
        //     {...backdropProps}
        //     opacity={0.5}
        //     appearsOnIndex={0}
        //     disappearsOnIndex={-1}
        //     style={[
        //       { backgroundColor: 'rgba(0, 0, 0, 1)' },
        //       StyleSheet.absoluteFillObject,
        //     ]}
        //     onPress={() => {
        //       onModalClose?.();
        //     }}
        //   />
        // );
      }}
      {...bottomSheetProps}
    >
      {!customWrapper ? (
        <BottomSheetContent
          showHandler={showHandler}
          showConfirmButton={showConfirmButton}
          showCancelButton={showCancelButton}
          buttonContainerProps={buttonContainerProps}
          containerProps={containerProps}
          tx={tx}
          title={title}
          titleContainerProps={titleContainerProps}
          onModalClose={onCloseModalHandler}
          onConfirm={onConfirm}
          onCancel={onCancel}
          CancelButtonProps={CancelButtonProps}
          ConfirmButtonProps={ConfirmButtonProps}
        >
          {children}
        </BottomSheetContent>
      ) : (
        <GorhonBottomSheetView
          style={{
            paddingBottom: insets?.bottom,
          }}
        >
          {children}
        </GorhonBottomSheetView>
      )}
    </BottomSheetModal>
  );
  // #endregion
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const BottomSheet = memo(forwardRef<BottomSheetRef, BottomSheetProps>(BottomSheetView));
export * from './props';
export default BottomSheet;
