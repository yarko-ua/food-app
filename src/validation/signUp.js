import * as yup from 'yup';


export const signUpValidationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  name: yup
    .string('Enter your name')
    .required('Name is required')
    .min(2, 'Name can\'t be less than 2 words')
    .max(100, 'Enter valid name')
});
