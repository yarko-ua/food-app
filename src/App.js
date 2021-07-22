import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Box, Container, Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { Provider, useDispatch } from 'react-redux';
import { store } from './app/store';
import { AppWrapper } from './features/app/AppWrapper';
import { fbApp } from './features/app/fileUploader/fileUploaderAPI';
import firebase from 'firebase/app';
import 'firebase/auth';
import { initUser } from './features/auth/AuthSlice';

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

    '& > div': {
      width: '100%',
      height: '100%',
      padding: 25
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});


function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user  = firebase.auth(fbApp).currentUser;

  if (!user) {
    dispatch(initUser({email: 'ssilvias13@gmail.com', password: 'Ukrcrimea_2019'}))
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Box component="main" className={classes.root}>
          <Paper elevation={5}>
            <Container maxWidth={false} disableGutters className={classes.container} >
              <AppWrapper />
              {/* <Switch>
                { !isAuth && <Route exact path="/auth" component={Authorization} /> }
                <Route path="/app" component={Test} />
                { !isAuth && <Redirect to="/auth" /> }
                <Route path="*" render={props => (<h1>Not Found</h1>)} />
              </Switch> */}
            </Container>
          </Paper>
        </Box>
      </Provider>
    </BrowserRouter>
    
  );
}

export default App;
