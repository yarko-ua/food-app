import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth';
import { fbApp } from '../app/fileUploader/fileUploaderAPI';

const defaultFbAuth = firebase.auth(fbApp);

const initialState= {
  name: '',
  surname: '',
  uid: null,
  avatar: '',
  age: null
}

export const asyncInitUser = createAsyncThunk(
  'auth/init',
  async ({email, password}) => {
    const response = await defaultFbAuth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('userCredential', userCredential);
      });

    return response;
  }
) 

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initUser: async ({email, password}) => {
      const response = await defaultFbAuth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          console.log('userCredential', userCredential);
        });
  
      return response;
    }
  }
})

export const { initUser } = authReducer.actions;

export default authReducer.reducer;