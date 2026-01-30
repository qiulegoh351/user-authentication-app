import { ReactElement, Ref } from 'react';
// eslint-disable-next-line no-restricted-imports
import { TextInput as RNTextInput } from 'react-native';
import { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import { InputProps, StackProps, XStackProps } from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type TextInputProps = Omit<InputProps, 'onChange'> & {
  prefix?: string | React.ReactElement;
  value?: string;
  error?: boolean;
  postfix?: ReactElement;
  inputContainerProps?: XStackProps;
  parentContainerProps?: StackProps;
  unstyledDisabled?: boolean;
  onChange?: (value: string) => void;
  trimValueOnBlur?: boolean;
  extra?: ReactElement;
  bottomSheet?: boolean;
  bottomSheetTextProps?: BottomSheetTextInputProps;
  textInputRef?: Ref<RNTextInput>;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default TextInputProps;
