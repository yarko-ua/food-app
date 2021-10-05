import { Button, Container, Grid, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useFormik } from "formik"
import PropTypes from 'prop-types'
import { divideCamelString } from "helpers/strings"
import { emailValidationSchema } from "validation/email"

const useStyles = makeStyles({
  input: {
    marginBottom: 15
  }
})


const UpdateEmail = ({ email, handleSubmit }) => {

  const formik = useFormik({
    initialValues: {
      email
    },
    validationSchema: emailValidationSchema,
    onSubmit: async (values, formikBag) => {
      console.log(`values`, values)
      console.log(`formikBag`, formikBag)
      handleSubmit && handleSubmit(values.email)
    }
  })
  const formStyles = useStyles()

  return (
    <form onSubmit={formik.handleSubmit}>
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
                  type="email"
                  error={formik.touched[field[0]] && Boolean(formik.errors[field[0]])} 
                  helperText={formik.touched[field[0]] && formik.errors[field[0]]} 
                />
              </Container>
            </Grid>
          ))
        }

        <Grid item xs={12}>
          <Container>
            <Button disabled={!formik.dirty} type="submit" variant="contained" color="primary" >Update email</Button>
          </Container>
        </Grid>
      </Grid>
    
    </form>
  )
}

UpdateEmail.propTypes = {
  email: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func
}

UpdateEmail.defaultProps = {
  handleSubmit: () => {}
}

export default UpdateEmail