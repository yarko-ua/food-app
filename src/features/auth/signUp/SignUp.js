import { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, TextField, CircularProgress, Grid } from "@material-ui/core"
import { useFormik } from "formik"
import { useSelector,useDispatch } from "react-redux"
import { signUpValidationSchema } from "../../../validation/signUp"
import { signUpUser } from "../authSlice"

export const SignUp = ({location, history}) => {

  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const auth = useSelector(state => state.user.auth);
  const histor = useHistory()

  // const [state, setstate] = useState(initialState)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: ''
    },
    validationSchema: signUpValidationSchema,
    // validateOnMount: true,
    onSubmit: async values => {
      console.log(`values`, values);
      
      dispatch(signUpUser(values))


      // await new Promise(resolve => setTimeout(() => resolve(values), 700));

      // return values;

      // history.replace('/app');
    }
  })

  useEffect(() => {
    if (auth) {
      histor.push('/lists')
    }
  }, [auth, histor])


  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" styles={{height: '100%', width: '100%'}} >
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <form onSubmit={formik.handleSubmit} >
      <h2>SignUp</h2>

      <TextField 
        fullWidth
        value={formik.values.email} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        name="email" 
        variant="outlined" 
        label="Email" 
        id="email" 
        type="email" 
        required
        error={formik.touched.email && Boolean(formik.errors.email) }
        helperText={formik.touched.email && formik.errors.email} />
      <TextField 
        fullWidth
        value={formik.values.password} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        name="password" 
        variant="outlined" 
        label="Password" 
        id="password" 
        type="password" 
        required
        error={formik.touched.password && Boolean(formik.errors.password) }
        helperText={formik.touched.password && formik.errors.password} />
      <TextField 
        fullWidth
        value={formik.values.name} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        name="name" 
        variant="outlined" 
        label="Name" 
        id="name" 
        type="text" 
        required
        error={formik.touched.name && Boolean(formik.errors.name) }
        helperText={formik.touched.name && formik.errors.name} />
      <Button 
        fullWidth
        type="submit"
        disabled={ !formik.dirty || !formik.isValid} 
        size="large" 
        color="primary" 
        variant="contained" 
      >Sign Up</Button>
      <Link to={history.location.state}> Go back  </Link>    
      <pre>
        {JSON.stringify(formik, null , 2)}
      </pre>
    </form>
  )
}