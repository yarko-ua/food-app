import { Grid, IconButton } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "features/auth/authSlice";
import { authDataSelector, isAuthSelector } from "selectors/auth";

const useHeaderStyles = makeStyles({
  root: {
    width: '100%',
    // position: 'absolute',
    // left: 0
  }
});

const Header = () => {
  const styles = useHeaderStyles();
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector); 
  const { displayName } = useSelector(authDataSelector); 
  // const userName = useSelector(state => state.auth.data?.displayName);

  if (!isAuth) return <></>

  const handleClick = () => {
    dispatch(signOutUser());
  }

  return (
    <header className={styles.root}>
      <Grid container alignItems="center" justifyContent="flex-end">
        <Grid item xs={6}></Grid>
        <Grid item xs={6} container alignItems="center" justifyContent="flex-end">
          <span>Hi, {displayName}</span>
          <IconButton onClick={ handleClick }>
            <ExitToAppIcon />
          </IconButton>
        </Grid>
      </Grid>
    </header>
  )
}

export default Header;