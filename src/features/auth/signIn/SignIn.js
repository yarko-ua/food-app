import { Button, TextField, CircularProgress, Grid } from "@material-ui/core"
import { useFormik } from "formik"
import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { isAuthSelector } from "selectors/auth"
import { signInValidationSchema } from "validation/signIn"
import { signInUser } from "../authSlice"

export const SignIn = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const isAuth = useSelector(isAuthSelector);
  const history = useHistory()

  // const [state, setstate] = useState(initialState)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signInValidationSchema,
    // validateOnMount: true,
    onSubmit: async values => {
      dispatch(signInUser(values));
    }
  })

  useEffect(() => {
    if (isAuth) {
      const { state }  = history.location

      console.log(`state`, state)

      history.push( state?.from ? state.from.pathname : '/')
    }
  }, [isAuth, history])


  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" styles={{height: '100%', width: '100%'}} >
        <CircularProgress />
      </Grid>
    )
  }
    

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
        <Link to={ {pathname:`/signup`, state: {from:'/signin'} }}>Sign Up</Link> 
      </p>      
      <pre>
        {JSON.stringify(formik, null , 2)}
      </pre>
    </form>
  )
}