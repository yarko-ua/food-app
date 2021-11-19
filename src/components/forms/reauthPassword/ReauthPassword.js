import { useContext } from "react"
// import { useDispatch } from "react-redux"
import { Box, Button, Grid, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useFormik } from "formik"
import PropTypes from "prop-types"
import { divideCamelString } from "helpers/strings"
import { ModalContext } from "features/modal/Modal"
import passwordValidationSchema from "validation/password"

const useStyles = makeStyles({
	form: {
		// backgroundColor: '#FFFFFF'
	},
	input: {
		marginBottom: 15,
	},
	submit: {
		"&:not([disabled])": {
			backgroundColor: "rgba(100, 255, 100, 1)",

			"&:hover": {
				backgroundColor: "rgba(50, 205, 50, 1)",
			},
		},
	},
	submitNotValid: {
		backgroundColor: "rgba(194, 194, 25, 1)",

		"&:hover": {
			backgroundColor: "rgba(154, 154, 11, 1)",
		},
	},
	decline: {
		backgroundColor: "rgba(215, 75, 75, 1)",
		marginTop: 10,
		"&:hover": {
			backgroundColor: "rgba(165, 25, 25, 1)",
		},
	},
})

const ReauthPassword = ({ handleSubmit }) => {
	// const dispatch = useDispatch()

	const modal = useContext(ModalContext)

	const formik = useFormik({
		initialValues: {
			password: "",
		},
		validationSchema: passwordValidationSchema,
		onSubmit: async (values, formikBag) => {
			console.log(`values`, values)

			// modal.handleClose() close by reauth state change

			if (handleSubmit) handleSubmit(values, formikBag)
			// console.log(`formikBag`, formikBag)
			// formikBag.resetForm()
		},
	})
	const formStyles = useStyles()

	console.log(`formik`, formik)

	return (
		<form onSubmit={formik.handleSubmit} className={formStyles.form}>
			<Grid container>
				<Grid item xs={12}>
					<Box component="h2" sx={{ textAlign: "center", mt: 0 }}>
						Confirmation required
					</Box>
				</Grid>

				{Object.entries(formik.initialValues).map((field) => (
					<Grid key={field[0]} item xs={12} className={formStyles.input}>
						<TextField
							fullWidth
							value={formik.values[field[0]]}
							onChange={formik.handleChange}
							name={field[0]}
							variant="outlined"
							label={divideCamelString(field[0])}
							id={field[0]}
							type="password"
							error={
								formik.touched[field[0]] && Boolean(formik.errors[field[0]])
							}
							helperText={formik.touched[field[0]] && formik.errors[field[0]]}
						/>
					</Grid>
				))}

				<Grid item xs={12}>
					<Button
						disabled={!formik.dirty}
						type="submit"
						variant="contained"
						color="primary"
						className={`${
							formik.dirty && !formik.isValid
								? formStyles.submitNotValid
								: formStyles.submit
						}`}
						fullWidth
					>
						Confirm
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Button
						type="button"
						variant="contained"
						color="primary"
						className={formStyles.decline}
						fullWidth
						onClick={modal.handleClose}
					>
						Decline
					</Button>
				</Grid>
			</Grid>
		</form>
	)
}

ReauthPassword.propTypes = {
	handleSubmit: PropTypes.func,
}

ReauthPassword.defaultProps = {
	handleSubmit: () => {},
}

export default ReauthPassword
