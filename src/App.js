import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Box, Container, Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AppWrapper } from './features/app/AppWrapper';
import { AuthWrapper} from './features/auth/AuthWrapper';
import PrivateRoute from './routes/PrivateRoute';
import Header from './components/header/Header';
import { Product } from './features/product/Product';
import { Notification } from './features/notification/Notification';
import { auth } from './app/firebase';
import { SignIn } from './features/auth/signIn/SignIn';
import { SignUp } from './features/auth/signUp/SignUp';


// auth


const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    padding: 50,
    boxSizing: 'border-box',
    backgroundColor: 'rgba(200, 200, 200, .7)',
  
    '& *': {
      boxSizing: 'border-box',
    },

    '& > div:not(.Toastify)': {
      width: '100%',
      height: '100%',
      padding: 25
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100%'
  },
  version: {
    position: 'fixed',
    top: 10,
    left: 10,
    margin: 0
  }
});


function App() {
  const classes = useStyles();

  useEffect(() => {
    // auth.onAuthStateChanged(user => {
    //   console.log(`user`, user)
    // })
    // return () => {
    //   cleanup
    // }
  }, [])

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Box component="main" className={classes.root}>
          <h6 className={classes.version}>App v.{process.env.REACT_APP_VERSION} </h6>
          <Paper elevation={5}>
            <AuthWrapper>
              <Header />
              <Container maxWidth={false} disableGutters className={classes.container} >
                <Switch>
                  <Route exact path="/signin" component={SignIn} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/product/:productID" component={Product} />
                  {/* <PrivateRoute exact path="/app/settings" render={props => <> App settings </>} /> */}
                  <PrivateRoute path="/" component={AppWrapper} />
                  <Route path="*" render={props => (<h1>Not Found</h1>)} />
                </Switch>
              </Container>
            </AuthWrapper>
          </Paper>
          <Notification />
        </Box>
      </Provider>
    </BrowserRouter>
    
  );
}

export default App;
