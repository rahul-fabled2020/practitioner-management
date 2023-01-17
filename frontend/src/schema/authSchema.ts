import * as yup from 'yup';
import { AUTH_MESSAGES } from '../constants/messages';

export const userSignInSchema = yup.object().shape({
  email: yup.string().email(AUTH_MESSAGES.VALID_EMAIL).required(AUTH_MESSAGES.EMAIL_REQUIRED),
  password: yup.string().trim().required(AUTH_MESSAGES.PASSWORD_REQUIRED).min(8, AUTH_MESSAGES.PASSWORD_INVALID_LENGTH),
});

export const userSignUpSchema = yup.object().shape({
  name: yup.string().trim().required(AUTH_MESSAGES.NAME_REQUIRED),
  email: yup.string().email(AUTH_MESSAGES.VALID_EMAIL).required(AUTH_MESSAGES.EMAIL_REQUIRED),
  password: yup.string().trim().required(AUTH_MESSAGES.PASSWORD_REQUIRED).min(8, AUTH_MESSAGES.PASSWORD_INVALID_LENGTH),
  rePassword: yup
    .string()
    .required(AUTH_MESSAGES.RE_PASSWORD_REQUIRED)
    .oneOf([yup.ref('password')]),
});
