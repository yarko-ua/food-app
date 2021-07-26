import { Button, TextField, CircularProgress } from "@material-ui/core"
import { useFormik } from "formik"
import { useSelector,useDispatch } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import { signInValidationSchema } from "../../../validation/signIn"
import { signInUser } from "../authSlice"

export const SignIn = ({location, history}) => {
  const dispatch = useDispatch();
  const userInitializing = useSelector(state => state.user.initializing);
  const auth = useSelector(state => state.user.auth);

  // const [state, setstate] = useState(initialState)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signInValidationSchema,
    // validateOnMount: true,
    onSubmit: async values => {
      console.log(`values`, values);

      dispatch(signInUser(values));

      // history.replace('/app');
    }
  })

  if (userInitializing)
    return <CircularProgress />

  if (auth)
    return <Redirect to="/app" />

  return (
    <form onSubmit={formik.handleSubmit} >
      <h2>SignIn</h2>

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
      <Button 
        fullWidth
        type="submit"
        disabled={ !formik.dirty || !formik.isValid } 
        size="large" 
        color="primary" 
        variant="contained" 
      >Sign In</Button>
      <p align="center">
        Have not account yet? <br/>
        <Link to={ {pathname:`/auth/sign-up`, state: location.pathname}}>Sign Up</Link> 
      </p>      
      <pre>
        {JSON.stringify(formik, null , 2)}
      </pre>
    </form>
  )
}