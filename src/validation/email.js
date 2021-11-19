import * as yup from "yup"

const emailValidationSchema = yup.object({
	email: yup
		.string("Enter your email")
		.email("Enter a valid email")
		.required("Email is required"),
})

export default emailValidationSchema
