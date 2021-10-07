import { useDispatch } from "react-redux"
import { Button, Container, Grid, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useFormik } from "formik"
import PropTypes from 'prop-types'
import { divideCamelString } from "helpers/strings"
import { updatePasswordValidationSchema } from "validation/updatePass"
import { showToast } from "features/notification/notificationSlice"

const useStyles = makeStyles({
  form: {
    margin: '15px 0'
  },
  input: {
    marginBottom: 15
  },
  submit: {
    '&:not([disabled])': {
      backgroundColor: 'rgba(100, 255, 100, 1)'
    },
  },
  submitNotValid: {
    backgroundColor: 'rgba(194, 194, 25, 1)',
  }
})


const UpdatePassword = ({ handleSubmit }) => {

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmationPassword: ''
    },
    validationSchema: updatePasswordValidationSchema,
    onSubmit: async (values, formikBag) => {
      console.log(`values`, values)

      if (values.password !== values.confirmationPassword) {
        dispatch(showToast({
          show: true,
          type: 'error',
          message: 'Passwords are not same'
        }))

        return null
      }

      handleSubmit && handleSubmit(values)
      // console.log(`formikBag`, formikBag)
      formikBag.resetForm()
    }
  })
  const formStyles = useStyles()

  console.log(`formik`, formik)

  return (
    <form onSubmit={formik.handleSubmit} className={formStyles.form}>
      <Grid container justifyContent="space-between">

        {
          Object.entries(formik.initialValues).map(field => (
            <Grid key={field[0]} item xs={6} className={formStyles.input}>
              <Container>
                <TextField
                  fullWidth
                  value={formik.values[field[0]]}
                  onChange={formik.handleChange}
                  name={field[0]}
                  variant="outlined"
                  label={divideCamelString(field[0])}
                  id={field[0]}
                  type="password"
                  error={formik.touched[field[0]] && Boolean(formik.errors[field[0]])} 
                  helperText={formik.touched[field[0]] && formik.errors[field[0]]} 
                />
              </Container>
            </Grid>
          ))
        }

        <Grid item xs={12}>
          <Container>
            <Button 
              disabled={!formik.dirty} 
              type="submit" 
              variant="contained" 
              color="primary"
              className={`${formik.dirty && !formik.isValid ? formStyles.submitNotValid : formStyles.submit}`}
            >
              Update password
            </Button>
          </Container>
        </Grid>
      </Grid>
    
    </form>
  )
}

UpdatePassword.propTypes = {
  handleSubmit: PropTypes.func
}

UpdatePassword.defaultProps = {
  handleSubmit: () => {}
}

export default UpdatePassword