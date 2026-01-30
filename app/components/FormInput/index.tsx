import { ComponentType } from 'react';
import Text from '@app/components/Text';
import TextNode from '@app/components/TextNode';
import { typedMemo } from '@app/utils';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { Stack, XStack } from 'tamagui';

import { config } from './form.config';
import { FormInputProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const FormInputView = <T extends FieldValues = FieldValues>(props: FormInputProps<T>) => {
  const {
    title,
    titleProps,
    helperText,
    helperTextProps,
    errorTextProps,
    containerProps,
    isRequired = false,
    component,
    placeholder,
    props: ComponentProps,
    render,
    ...formProps
  } = props;

  // =================== VARIABLES
  const componentConfig = config.find((c) => c.name === component);
  const Component = componentConfig?.component as ComponentType<any>;
  const defaultProps = componentConfig?.props ?? {};

  // =================== VIEWS
  return (
    <Controller<T, Path<T>>
      {...formProps}
      render={(options) => {
        const {
          fieldState: { error },
          formState,
          field,
        } = options;
        const errorMessage = error?.message;
        const { value, disabled, onChange, onBlur } = field;

        const renderInput = () => {
          if (!Component) return null;

          return (
            <Component
              formState={formState}
              error={!!errorMessage}
              errorMessage={errorMessage}
              value={value}
              disabled={disabled}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              {...defaultProps}
              {...(ComponentProps as any)}
            />
          );
        };

        return (
          <Stack width={'100%'} gap={'$sm'} {...containerProps}>
            {title && (
              <XStack flexWrap="wrap">
                <TextNode fontSize={'$md'} fontWeight={'$500'} {...titleProps}>
                  {title}
                </TextNode>
                {isRequired && (
                  <Text color={'$errorText'} fontWeight="$600">
                    {` *`}
                  </Text>
                )}
              </XStack>
            )}
            <Stack gap="$2xs" alignItems="stretch">
              {render ? render({ comp: renderInput(), options }) : renderInput()}

              {helperText && (
                <TextNode
                  fontSize={'$sm'}
                  marginTop={2}
                  color={'$secondaryText'}
                  {...helperTextProps}
                >
                  {helperText}
                </TextNode>
              )}

              {errorMessage && (
                <Text
                  marginLeft="$xs"
                  fontSize={'$sm'}
                  fontWeight={'$400'}
                  letterSpacing={0.2}
                  color="$errorText"
                  {...errorTextProps}
                >
                  {errorMessage}
                </Text>
              )}
            </Stack>
          </Stack>
        );
      }}
    />
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const FormInput = typedMemo(FormInputView);
export default FormInput;
