import { Button, Container, Grid, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
  input: {
    marginBottom: 15
  }
})

export const ProfileForm = ({formik}) => {

  const formStyles = useStyles()

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="space-between">
        <Grid item xs={6} className={formStyles.input}>
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
          
        </Grid>
        <Grid item xs={6} className={formStyles.input}>
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
          
        </Grid>
        <Grid item xs={12}>
          <Container>
            <Button type="submit" variant="contained" color="primary" >Update info</Button>
          </Container>
        </Grid>
      </Grid>
      
      
    </form>
  )
}