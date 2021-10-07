import * as yup from 'yup'

export const profileFormValidation  = yup.object({
  firstName: yup
    .string('Enter your name')
    .min(2)
    .required('Name is required'),
  lastName: yup
    .string('Enter your surname')
    .min(2),
  address: yup
    .string('Enter your address')
    .min(3),
  city: yup
    .string('Fill in a city name')
    .min(2)
})