import { SelectInputProps, TextInputProps } from '@app/components';

import { ComponentPropsMap as LibraryComponentPropsMap } from './props';

declare module '@app/components/FormInput' {
  export interface ComponentPropsMap extends LibraryComponentPropsMap {
    // register over heres
    TextInput: TextInputProps;
    SelectInput: SelectInputProps;
  }
}
