import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import { loadState, saveState } from '../../helpers/appState';
import { fbApp } from '../app/fileUploader/fileUploaderAPI';
import { signIn, signOut, signUp } from './authAPI';

// const defaultFbAuth = firebase.auth(fbApp);

// console.log(`defaultFbAuth`, defaultFbAuth);
// console.log(`currentUser`, defaultFbAuth.currentUser);


const data = loadState('user');

console.log(`userData`, data);

const initialState = {
  auth: false,
  loading: false,
  initializing: false,
  data: {},
  ...data
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
  async ({email, password, name, photo }) => {
    const user = signUp(email, password, name, photo)

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

export const getUserFullInfo = createAsyncThunk(
  'user/getFullInfo',
  async uid => {
    const user = firebase.auth().currentUser
    console.log(`user`, user)

    if (user) {
      console.log(`user.toJSON()`, user.toJSON())
    }

    return user.uid
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
        state.data = action.payload;
        state.auth = true;

        saveState('user', state);

      })
      .addCase(signInUser.rejected, (state, action) => {
        state.initializing = false;
        state.data = {};
      })

      .addCase(signUpUser.pending, state => {
        state.initializing = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.initializing = false;
        state.data = action.payload;
        state.auth = true;

        saveState('user', state);

      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.initializing = false;
        state.data = action.payload;
      })

      .addCase(signOutUser.pending, state => {
        state.initializing = true;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.initializing = false;
        state.data = {};
        state.auth = false;

        saveState('user', state);

      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.initializing = false;
      })
      .addCase(getUserFullInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserFullInfo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserFullInfo.fulfilled, (state, action) => {
        state.loading = false;
        console.log(`action`, action)
      })
  }
})

// export const { initUser } = authReducer.actions;

export default authReducer.reducer;