import { Button, Grid, IconButton } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../features/auth/authSlice";

const useHeaderStyles = makeStyles({
  root: {
    width: '100%',
  }
});

const Header = () => {
  const styles = useHeaderStyles();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.user.auth);

  if (!auth) return <></>

  const handleClick = () => {
    dispatch(signOutUser());
  }

  return (
    <header className={styles.root}>
      <Grid container justifyContent="flex-end">
        <Grid item xs={3} container justifyContent="flex-end">
          <IconButton onClick={ handleClick }>
            <ExitToAppIcon />
          </IconButton>
        </Grid>
      </Grid>
    </header>
  )
}

export default Header;