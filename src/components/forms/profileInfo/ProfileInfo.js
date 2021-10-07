import { Button, Container, Grid, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useFormik } from "formik"
import { profileFormValidation } from "validation/profile"
import PropTypes from 'prop-types'
import { divideCamelString } from "helpers/strings"

const useStyles = makeStyles({
  form: {
    marginBottom: 15
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


const ProfileInfo = ({ initialValues, handleSubmit }) => {

  console.log(`initialValues`, initialValues)

  const formik = useFormik({
    initialValues: {
      ...initialValues
    },
    validationSchema: profileFormValidation,
    onSubmit: async values => {
      console.log(`values`, values)
      handleSubmit && handleSubmit()
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
                  type="text"
                  error={formik.touched[field[0]] && Boolean(formik.errors[field[0]])} 
                  helperText={formik.touched[field[0]] && formik.errors[field[0]]} 
                />
              </Container>
            </Grid>
          ))
        }
        {/* <Grid item xs={6} className={formStyles.input}>
          <Container>
          <TextField
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            name="firstName"
            variant="outlined"
            label="Name"
            id="firstName"
            type="text"
            error={formik.touched.firstName && Boolean(formik.errors.firstName)} 
            helperText={formik.touched.firstName && formik.errors.firstName} 
          />
          </Container>
          
        </Grid>
        <Grid item xs={6} className={formStyles.input}>
          <Container>
          <TextField
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            name="lastName"
            variant="outlined"
            label="Surname"
            id="lastName"
            type="text"
            error={formik.touched.lastName && Boolean(formik.errors.lastName)} 
            helperText={formik.touched.lastName && formik.errors.lastName} 
          />
          </Container>
          
      </Grid> */}
        {/* <Grid item xs={6} className={formStyles.input}>
          <Container>
          <TextField
            fullWidth
            value={formik.values.address}
            onChange={formik.handleChange}
            name="address"
            variant="outlined"
            label="Address"
            id="address"
            type="text"
            error={formik.touched.address && Boolean(formik.errors.address)} 
            helperText={formik.touched.address && formik.errors.address} 
          />
          </Container>
          
        </Grid> */}
        <Grid item xs={12}>
          <Container>
            <Button 
              disabled={!formik.dirty} 
              type="submit" 
              variant="contained" 
              color="primary"
              className={`${formik.dirty && !formik.isValid ? formStyles.submitNotValid : formStyles.submit}`}
            >
              Update info
            </Button>
          </Container>
        </Grid>
      </Grid>
    
    </form>
  )
}

ProfileInfo.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
}

ProfileInfo.defaultProps = {
  handleSubmit: () => {}
}

export default ProfileInfo