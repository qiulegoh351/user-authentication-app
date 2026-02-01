import { FC, useCallback, useState } from 'react';
import { Button, FormInput, Screen, Text } from '@app/components';
import { useAuth } from '@app/context';
import { useTranslation } from '@app/i18n';
import { toast, useSafeTimeout } from '@app/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { Stack } from 'tamagui';

import SignupScreenProps, { SignupFieldValues as FieldValues } from './props';
import { signupFormSchema } from './validation';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const SignupScreen: FC<SignupScreenProps> = (props) => {
  const { navigation } = props;

  // =============== HOOKS
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { setSafeTimeout } = useSafeTimeout();
  const { signup } = useAuth();
  const forms = useForm<FieldValues>({
    defaultValues: {
      name: null,
      email: null,
      password: null,
      confirm_password: null,
    },
    resolver: yupResolver(signupFormSchema(t)),
  });
  const { handleSubmit } = forms;

  // =============== VARIABLES

  // =============== EVENTS
  const onSubmit = useCallback(
    (values: FieldValues) => {
      setLoading(true);
      setSafeTimeout(() => {
        const data = {
          name: values.name || '',
          email: values.email || '',
          password: values.password || '',
        };
        signup({
          data,
          onSuccess: () => {
            toast.success(t('common:label.successSignup'));
            navigation.goBack();
          },
          onError: ({ message }) => {
            toast.error(message);
          },
        });

        setLoading(false);
      });
    },
    [signup, t, navigation, setSafeTimeout],
  );

  // =============== EFFECTS

  // =============== VIEWS
  return (
    <FormProvider {...forms}>
      <Screen systemBarStyle="dark" preset="scroll">
        <Stack flex={1} gap="$2xl" justifyContent="center" padding="$screenPadding">
          <Text textAlign="center" preset="subheading" text={t('common:label.createNewAccount')} />

          <Stack gap="$formGap">
            <FormInput<FieldValues>
              component="TextInput"
              name="name"
              title={t('common:input.name.title')}
              placeholder={t('common:input.name.placeholder')}
            />
            <FormInput<FieldValues>
              component="TextInput"
              name="email"
              title={t('common:input.email.title')}
              placeholder={t('common:input.email.placeholder')}
            />
            <FormInput<FieldValues>
              component="PasswordInput"
              name="password"
              title={t('common:input.password.title')}
              placeholder={t('common:input.password.placeholder')}
            />
            <FormInput<FieldValues>
              component="PasswordInput"
              name="confirm_password"
              title={t('common:input.confirmPassword.title')}
              placeholder={t('common:input.confirmPassword.placeholder')}
            />
          </Stack>

          <Button
            loading={loading}
            text={t('common:button.signup')}
            onPress={handleSubmit(onSubmit)}
          />

          <Text preset="caption" textAlign="center">
            {t('common:label.alreadyHaveAccount')}{' '}
            <Text
              color="$primary500"
              fontWeight="$600"
              preset="caption"
              hitSlop={30}
              onPress={() => navigation.goBack()}
            >
              {t('common:button.backToSignin')}
            </Text>
          </Text>
        </Stack>
      </Screen>
    </FormProvider>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default SignupScreen;
