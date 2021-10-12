import { useCallback, useState } from "react"
import { TextField, IconButton, Grid } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
  root: {
    flexWrap: 'nowrap'
  },
  input: {

  },
  control: {
    background: 'rgba(10, 10, 200, 1)',
    borderRadius: 0,

    '& svg': {
      fill: '#FFFFFF'
    },

    '&:hover svg': {
      fill: 'rgba(10, 10, 200, 1)'
    }
  }
})


const PasswordInput = props => {
  const styles = useStyles()

  const [type, setType] = useState('password')
  
  const handlePasswordVisibility = useCallback(
    () => {
      if (type === 'password')
        setType('text')

      if (type === 'text')
        setType('password')
    },
    [type],
  )

  return (
    <Grid container alignItems="stretch" className={styles.root} >
      <Grid container item xs="auto" className={styles.input}>
        <TextField {...props} type={type} />
      </Grid>

      <Grid container item xs>
        <IconButton onClick={handlePasswordVisibility} className={styles.control} >
        { type ==='password' ? <Visibility /> : <VisibilityOff /> }
        </IconButton>
      </Grid>
      
    </Grid>
  )
}

export default PasswordInput