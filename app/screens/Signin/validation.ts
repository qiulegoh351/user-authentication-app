import * as yup from 'yup';
import { ObjectSchema } from 'yup';

import { SigninFieldValues } from './props';

export const signinFormSchema = (t: any): ObjectSchema<SigninFieldValues> => {
  return yup.object().shape({
    email: yup.string().nullable().required(t('common:input.email.required')).optional(),
    password: yup.string().nullable().required(t('common:input.password.required')).optional(),
  });
};

export const loginCheckSchema = yup.object({
  email: yup.string().email(),
  password: yup.string().min(6),
});
