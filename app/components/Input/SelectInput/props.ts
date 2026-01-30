import { ReactElement } from 'react';
import BottomSheetProps from '@app/components/BottomSheet/props';
import { TextProps } from '@app/components/Text';
import { BottomSheetFlashListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList';
import { StackProps } from 'tamagui';

import { TextInputProps } from '../TextInput';

export type SelectItem<T = any> = {
  /**
   * String displayed in `TextInput` when the option is selected
   */
  label: string;

  /**
   * Determine the `isSelected` value by comparing this attribute with the selected one's
   */
  value: string;

  /**
   * The original object before mapped into `SelectItem`,
   * useful when need to retrieve other/original data from selected option
   */
  metaData?: T | null;
};

export type SelectInputProps<T extends object = any> = {
  value?: SelectItem<T>[];

  onChange?: (option: SelectItem<T>[]) => void;

  onChangeCallback?: (option: SelectItem<T>[]) => void;

  isControlled?: boolean;

  multiple?: boolean;

  confirmOnChange?: boolean;

  error?: boolean;

  /**
   * String displayed in the header of bottom sheet
   */
  sheetTx?: TextProps['tx'];
  sheetTitle?: string;

  options: SelectItem<T>[];

  loading?: boolean;

  disabled?: boolean;

  placeholder?: string;

  customActivatorPostfix?: ReactElement;

  /**
   * Custom activator element, if not provided, will use default `TextInput` with arrow icon
   *
   * Please use this prop when you want to render selected value's label as a ReactElement
   *
   * @param value Currently selected value
   * @returns Custom activator element
   *
   */
  renderCustomActivator?: (value?: SelectItem<T> | SelectItem<T>[]) => ReactElement;

  renderCustomDataContainer?: (
    options: SelectItem<T>[],
    defaultOnPress: (item?: SelectItem<T>) => void,
    value?: SelectItem<T> | SelectItem<T>[],
  ) => ReactElement;

  /**
   * Custom option rendering function, not being used when `renderCustomDataContainer` is passed
   * @param item Item within `options` passed
   * @param isSelected True when the item is currently selected value
   * @returns Custom option element
   */
  renderOption?: (
    prop: {
      item: SelectItem<T>;
      index: number;
    },
    isSelected: boolean,
    defaultOnPress: () => void,
  ) => ReactElement;

  /**
   * Props to be passed into parent `Stack` container
   */
  containerProps?: StackProps;

  /**
   * Props to be passed into `TextInput` activator
   */
  textInputProps?: TextInputProps;

  /**
   * Props to be passed into `BottomSheetFlashList`
   */
  flashListProps?: Omit<BottomSheetFlashListProps<SelectItem<T>>, 'data' | 'renderItem'>;

  bottomSheetProps?: Omit<BottomSheetProps, 'title' | 'customWrapper' | 'children'>;
};
