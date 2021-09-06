
import { Button, TextField } from "@material-ui/core"

export const ProfileForm = ({formik}) => {

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <Button type="submit" variant="contained" color="primary" >Update info</Button>
    </form>
  )
}