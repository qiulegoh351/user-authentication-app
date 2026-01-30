import { ReactNode } from 'react';
import { TextProps } from '@app/components/Text';
import {
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { StackProps } from 'tamagui';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type RenderProps<T extends FieldValues = FieldValues> = {
  comp: ReactNode;
  options: {
    field: ControllerRenderProps<T, FieldPath<T>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  };
};
export type FormInputProps<T extends FieldValues = FieldValues> = Omit<
  ControllerProps<T>,
  'render'
> &
  {
    [K in keyof ComponentPropsMap]: {
      component: K;
      props?: ComponentPropsMap[K];
      containerProps?: StackProps;
      errorTextProps?: TextProps;

      title?: React.ReactElement | string;
      placeholder?: string;
      helperText?: React.ReactElement | string;
      helperTextProps?: TextProps;
      titleProps?: TextProps;

      isRequired?: boolean;
      isSectionStyle?: boolean;
      valueKey?: string;
      eventKey?: string;
      render?: (props: RenderProps<T>) => ReactNode;
    };
  }[keyof ComponentPropsMap];

export interface ComponentPropsMap {}
export type ComponentConfig = {
  [K in keyof ComponentPropsMap]: {
    /**
     * the name of the component (must be unique)
     */
    name: K;
    /**
     * the actual component
     */
    component: React.ComponentType<ComponentPropsMap[K]>;
    /**
     * the default props that will inject to component
     */
    props?: ComponentPropsMap[K];
  };
}[keyof ComponentPropsMap];

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default FormInputProps;
