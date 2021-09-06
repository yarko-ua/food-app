import * as yup from 'yup'

export const profileFormValidation  = yup.object({
  firstName: yup
    .string('Enter your name')
    .min(2),
  lastName: yup
    .string('Enter your surname')
    .min(2),
  address: yup
    .string('Enter your address')
    .min(3)
})