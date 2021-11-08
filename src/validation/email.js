import * as yup from 'yup';

// TODO: 'TEST CHANGES'

export const emailValidationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});