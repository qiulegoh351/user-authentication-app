import { Text } from '@app/components/Text';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import trim from 'lodash/trim';
import { Input as TamaguiInput, Stack, XStack, getTokens } from 'tamagui';

import { TextInputProps as Props } from './props';
import { createInputTheme } from '../helper';
/**
 * ===========================
 * MAIN
 * ===========================
 */
export const TextInput: React.FC<Props> = (props) => {
  const {
    prefix,
    postfix,
    inputContainerProps,
    parentContainerProps,
    disabled,
    error,
    value,
    unstyledDisabled = false,
    extra,
    onChange,
    placeholder,
    bottomSheet,
    trimValueOnBlur = true,
    bottomSheetTextProps,
    multiline,
    textInputRef,
    ...restProps
  } = props;

  // =============== VARIABLES
  const isDisabled = unstyledDisabled ? false : disabled;

  // =============== HOOKS
  const { borderColor, color, inputTheme } = createInputTheme({
    error,
    disabled: isDisabled,
  });

  const primaryText = getTokens()?.color?.$primaryText?.val;
  const placeholderText = getTokens()?.color?.$placeholderText?.val;

  // =============== VIEWS
  const renderPrefix = (): React.ReactElement | null => {
    if (!prefix) return null;
    if (typeof prefix === 'string') {
      return <Text paddingLeft={'$md'}>{prefix}</Text>;
    }
    return prefix;
  };

  const renderTextInput = () => {
    if (bottomSheet) {
      return (
        <BottomSheetTextInput
          ref={textInputRef as any}
          placeholder={placeholder}
          cursorColor={primaryText}
          placeholderTextColor={placeholderText}
          {...bottomSheetTextProps}
          value={value}
          onChangeText={onChange}
          scrollEnabled={false}
          onBlur={(e) => {
            bottomSheetTextProps?.onBlur?.(e);
            if (trimValueOnBlur) {
              onChange?.(trim(value));
            }
          }}
          style={[
            {
              height: 40,
              paddingVertical: 6,
              paddingHorizontal: 18,
              letterSpacing: 0,
              fontSize: 14,
              fontWeight: 500,
              fontFamily: inputTheme?.fontFamily as string,
              flex: 1,
            },
            bottomSheetTextProps?.style,
          ]}
        />
      );
    }
    // return null;
    return (
      <TamaguiInput
        ref={textInputRef}
        flex={1}
        color={color}
        disabled={disabled}
        placeholder={placeholder}
        multiline={multiline}
        {...inputTheme}
        {...restProps}
        borderWidth={0}
        backgroundColor={'transparent'}
        onChangeText={(val) => {
          restProps?.onChangeText?.(val);
          onChange?.(val);
        }}
        value={value}
        scrollEnabled={false}
        onBlur={(e) => {
          restProps?.onBlur?.(e);
          if (trimValueOnBlur) {
            onChange?.(trim(value));
          }
        }}
      />
    );
  };

  return (
    <Stack
      backgroundColor="$inputBg"
      borderRadius={'$radius.sm'}
      borderColor={borderColor}
      paddingHorizontal="$containerPadding"
      borderWidth={1}
      focusStyle={{
        borderColor: '$primary500',
      }}
      {...parentContainerProps}
    >
      <XStack alignItems="center" gap={'$md'} {...inputContainerProps}>
        {prefix && renderPrefix()}
        {renderTextInput()}
        {postfix && postfix}
      </XStack>
      {extra && extra}
    </Stack>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default TextInput;
