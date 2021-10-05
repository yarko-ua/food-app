import * as yup from 'yup';

export const updatePasswordValidationSchema = yup.object({
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmationPassword: yup
    .string('Enter same password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});