import { ReactNode, useCallback, useRef, useState } from 'react';
import BottomSheet, { BottomSheetRef } from '@app/components/BottomSheet';
import Button from '@app/components/Button';
import Spinner from '@app/components/Spinner';
import TextNode from '@app/components/TextNode';
import TouchableOpacity from '@app/components/TouchableOpacity';
import { typedMemo } from '@app/utils';
import ArrowDown from '@assets/icons/arrow-down.svg';
import CloseIcon from '@assets/icons/close.svg';
import { useBottomSheetScrollableCreator } from '@gorhom/bottom-sheet';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTokens, Stack, XStack } from 'tamagui';

import { SelectInputProps, SelectItem } from './props';
import TextInput from '../TextInput';
import Item from './SelectItem';

/**u
 * ===========================
 * MAIN
 * ===========================
 */
const SelectInputView = <T extends object>(props: SelectInputProps<T>) => {
  const {
    value: controlledValue,
    onChange: controlledOnChange,
    onChangeCallback,
    isControlled = true,
    sheetTx,
    sheetTitle,
    options = [],
    loading = false,
    disabled = false,
    customActivatorPostfix,
    confirmOnChange = true,
    error,
    containerProps,
    textInputProps,
    bottomSheetProps,
    placeholder = 'Please select',
    multiple: isMultiple = false,
    renderOption,
    renderCustomActivator,
  } = props;
  const {
    showConfirmButton = true,
    showCancelButton = false,
    buttonContainerProps,
    titleContainerProps,
    onCancel,
    CancelButtonProps,
    ConfirmButtonProps,
    enableDynamicSizing = true,
    ...restBottomSheetProps
  } = bottomSheetProps ?? {};

  // =============== HOOKS
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const BottomSheetScrollable = useBottomSheetScrollableCreator();
  const [tempValue, setTempValue] = useState(controlledValue);
  const [uncontrolledValue, uncontrolledOnChange] = useState(controlledValue);

  // =============== VARIABLES
  const insets = useSafeAreaInsets();
  const isActionButtonVisible = showConfirmButton || showCancelButton;
  const colorTokens = getTokens()?.color;
  const spaceTokens = getTokens()?.space;
  const [value, onChange] = isControlled
    ? [controlledValue, controlledOnChange]
    : [uncontrolledValue, uncontrolledOnChange];
  const valueLabel = (value ?? [])?.map((item) => item.label).join(', ');

  // =============== EVENTS
  const onChangeHandler = useCallback(
    (newValue: SelectItem<T>[], type: 'checkConfirm' | 'submit') => {
      if (confirmOnChange && type === 'checkConfirm') {
        setTempValue(newValue);
        return;
      }
      if (!isMultiple) {
        setTimeout(() => bottomSheetRef.current?.dismiss(), 200);
      }
      onChange?.(newValue);
      onChangeCallback?.(newValue);
    },
    [onChange, onChangeCallback, confirmOnChange, isMultiple],
  );

  const onResetUnConfirmValue = useCallback(() => {
    setTimeout(() => {
      setTempValue(value);
    }, 200);
  }, [value, setTempValue]);

  const onConfirmPress = useCallback(() => {
    onChangeHandler(tempValue ?? [], 'submit');
    setTimeout(() => bottomSheetRef.current?.dismiss(), 200);
  }, [tempValue, onChangeHandler]);

  const onSelectItem = useCallback(
    (item: SelectItem<T>) => {
      if (!isMultiple) {
        const newValue = item ? [item] : [];
        onChangeHandler(newValue, 'checkConfirm');
        return;
      }

      const current = value ?? [];
      const exists = current.some((v) => v.value === item.value);
      const finalValue = exists
        ? current.filter((v) => v.value !== item?.value)
        : [...current, item];
      onChangeHandler(finalValue, 'checkConfirm');
    },
    [isMultiple, value, onChangeHandler],
  );

  // =============== RENDERER
  const renderHeaderComponent = () => {
    const titleVisible = sheetTx || sheetTitle;
    return (
      <XStack
        alignItems="center"
        justifyContent="space-between"
        padding={'$screenPadding'}
        paddingBottom={'$lg'}
        marginBottom={'$sm'}
        borderBottomColor={'$border'}
        borderBottomWidth={1}
        {...titleContainerProps}
      >
        {titleVisible ? (
          <TextNode flex={1} preset="subheading" tx={sheetTx}>
            {sheetTitle}
          </TextNode>
        ) : (
          <Stack />
        )}
        <TouchableOpacity hitSlop={30} onPress={() => bottomSheetRef?.current?.dismiss()}>
          <CloseIcon color={colorTokens?.$secondaryText?.val} />
        </TouchableOpacity>
      </XStack>
    );
  };

  const renderActionButton = () => {
    if (!isActionButtonVisible || !confirmOnChange) return null;
    return (
      <Stack
        flexDirection="row"
        alignItems="center"
        marginTop={'$md'}
        justifyContent="center"
        gap="$sm"
        padding="$screenPadding"
        borderTopColor={'$border'}
        borderTopWidth={1}
        paddingBottom={spaceTokens?.screenPadding?.val + insets.bottom}
        {...buttonContainerProps}
      >
        {showCancelButton && (
          <Button
            variant="outlined"
            tx="common:button.cancel"
            onPress={() => {
              onCancel?.();
              bottomSheetRef?.current?.dismiss();
            }}
            {...CancelButtonProps}
          />
        )}
        {showConfirmButton && (
          <Button
            width={'100%'}
            tx="common:button.confirm"
            onPress={() => onConfirmPress?.()}
            containerStyle={{
              flex: 1,
            }}
            {...ConfirmButtonProps}
          />
        )}
      </Stack>
    );
  };
  const currentValue = confirmOnChange ? tempValue : value;

  const renderItem: (props: LegendListRenderItemProps<SelectItem<T>>) => ReactNode = useCallback(
    (props) => {
      const isSelected =
        currentValue?.some((findItem) => findItem?.value === props?.item?.value) ?? false;
      if (renderOption) return renderOption(props, isSelected, () => onSelectItem(props.item));
      return <Item selected={isSelected} item={props?.item} onPress={onSelectItem} />;
    },
    [currentValue, renderOption, onSelectItem],
  );

  // =============== VIEWS
  return (
    <Stack alignSelf="stretch" {...containerProps}>
      {/* Bottom Sheet Activator */}
      <TouchableOpacity
        onPress={() => {
          bottomSheetRef.current?.present();
        }}
        disabled={loading || disabled || !options?.length}
      >
        {renderCustomActivator ? (
          renderCustomActivator(value)
        ) : (
          <Stack pointerEvents={'none'}>
            <TextInput
              value={valueLabel}
              placeholder={loading ? 'Loading...' : options.length ? placeholder : 'No options'}
              postfix={
                <Stack>
                  {loading ? (
                    <Spinner size="small" />
                  ) : (
                    (customActivatorPostfix ?? <ArrowDown style={{ marginRight: -6 }} />)
                  )}
                </Stack>
              }
              error={error}
              disabled={disabled}
              {...textInputProps}
            />
          </Stack>
        )}
      </TouchableOpacity>

      {/* Select Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        title={sheetTitle}
        tx={sheetTx}
        enableDynamicSizing={enableDynamicSizing}
        snapPoints={undefined}
        customWrapper
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        {...restBottomSheetProps}
        onModalClose={onResetUnConfirmValue}
      >
        <Stack
          borderTopLeftRadius={'$radius.xl'}
          borderTopRightRadius={'$radius.xl'}
          backgroundColor={'$bg'}
          justifyContent="space-between"
          flex={1}
        >
          <LegendList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}_${item.value}`}
            showsHorizontalScrollIndicator={false}
            extraData={{ currentValue }}
            ListHeaderComponent={() => renderHeaderComponent()}
            ListFooterComponent={renderActionButton()}
            renderScrollComponent={BottomSheetScrollable}
          />
        </Stack>
      </BottomSheet>
    </Stack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const SelectInput = typedMemo(SelectInputView);
export default SelectInput;

export * from './props';
