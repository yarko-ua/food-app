import * as yup from "yup"

const passwordValidationSchema = yup.object({
	password: yup
		.string("Enter your password")
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
})

export default passwordValidationSchema
