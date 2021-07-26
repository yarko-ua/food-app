import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import { loadState, saveState } from '../../helpers/appState';
import { fbApp } from '../app/fileUploader/fileUploaderAPI';
import { signIn, signOut, signUp } from './authAPI';

// const defaultFbAuth = firebase.auth(fbApp);

// console.log(`defaultFbAuth`, defaultFbAuth);
// console.log(`currentUser`, defaultFbAuth.currentUser);


const userData = loadState('user');

console.log(`userData`, userData);

const initialState = {
  auth: false,
  initializing: false,
  ...userData
};


export const signInUser = createAsyncThunk(
  'auth/signIn',
  async ({ email , password}) => {
    const user = await signIn(email, password)

    console.log('signin response', user)

    return user;
  }
)

export const signUpUser = createAsyncThunk(
  'auth/signUp',
  async ({email, password}) => {
    const user = await signUp(email, password)

    console.log('signup response', user)

    return  user;
  }
)

export const signOutUser = createAsyncThunk(
  'auth/signOut',
  async () => {
    const response = await signOut()

    console.log(`signout response`, response);
  }
)

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signInUser.pending, state => {
        state.initializing = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.initializing = false;
        state.userData = action.payload;
        state.auth = true;

        saveState('user', state);

      })
      .addCase(signInUser.rejected, (state, action) => {
        state.initializing = false;
        state.userData = action.payload;
      })

      .addCase(signUpUser.pending, state => {
        state.initializing = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.initializing = false;
        state.userData = action.payload;
        state.auth = true;

        saveState('user', state);

      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.initializing = false;
        state.userData = action.payload;
      })

      .addCase(signOutUser.pending, state => {
        state.initializing = true;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.initializing = false;
        state.userData = {};
        state.auth = false;

        saveState('user', state);

      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.initializing = false;
      })
  }
})

// export const { initUser } = authReducer.actions;

export default authReducer.reducer;