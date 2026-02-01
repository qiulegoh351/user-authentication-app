import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { SignupFieldValues } from './props';

export const signupFormSchema = (t: any): ObjectSchema<SignupFieldValues> => {
  return yup.object().shape({
    name: yup.string().nullable().required(t('common:input.name.required')),
    email: yup
      .string()
      .nullable()
      .required(t('common:input.email.required'))
      .email(t('common:input.email.invalid')),
    password: yup
      .string()
      .nullable()
      .required(t('common:input.password.required'))
      .min(6, t('common:input.password.min')),
    confirm_password: yup
      .string()
      .nullable()
      .required(t('common:input.confirmPassword.required'))
      .oneOf([yup.ref('password')], t('common:input.confirmPassword.matches')),
  });
};
