import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Box, Container, Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AppWrapper } from './features/app/AppWrapper';
import { AuthWrapper } from './features/auth/AuthWrapper';
import PrivateRoute from './routes/PrivateRoute';
import Header from './components/header/Header';
import { Product } from './features/product/Product';
import { Notification } from './features/notification/Notification';

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
  }
});


function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Box component="main" className={classes.root}>
          <Paper elevation={5}>
            <Header />
            <Container maxWidth={false} disableGutters className={classes.container} >
              <Switch>
                <Route path="/auth" component={AuthWrapper} />
                <Route exact path="/product/:productID" component={Product} />
                {/* <PrivateRoute exact path="/app/settings" render={props => <> App settings </>} /> */}
                <PrivateRoute path="/app" component={AppWrapper} />
          
                <Redirect to="/auth" />
              </Switch>
              {/* <Switch>
                { !isAuth && <Route exact path="/auth" component={Authorization} /> }
                <Route path="/app" component={Test} />
                { !isAuth && <Redirect to="/auth" /> }
                <Route path="*" render={props => (<h1>Not Found</h1>)} />
              </Switch> */}
            </Container>
          </Paper>
          <Notification />
        </Box>
      </Provider>
    </BrowserRouter>
    
  );
}

export default App;
