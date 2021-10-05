import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth'
import { saveState } from '../../helpers/appState';
import { fbApp } from '../app/fileUploader/fileUploaderAPI';
import { signIn, signOut, signUp } from './authAPI';

const initialState = {
  isAuth: null,
  loading: false,
  data: null
};


export const signInUser = createAsyncThunk(
  'auth/signIn',
  async ({ email , password}) => {
    // try {
      const user = await signIn(email, password)

      console.log('signin response', user)
  
      saveState('user', { uid: user.uid } )

      await new Promise(res => { 
        setTimeout(() => {
          res(1)
        }, 2500)
      })

      console.log(`signin end`)
      
      return user;
    // } catch (e) {
    //   console.log(`e`, e)
    //   throw new Error(e)
    // }
    
  }
)

export const signUpUser = createAsyncThunk(
  'auth/signUp',
  async ({email, password, name, photo }) => {
    try {
      const user = await signUp(email, password, name, photo)

      saveState('user', { uid: user.uid } )

      console.log('signup response', user)

      return  user;
    } catch (error) {
      console.log(`error`, error)
      throw new Error(error)
    }
    
  }
)

export const signOutUser = createAsyncThunk(
  'auth/signOut',
  async () => {
    const response = await signOut()

    saveState('user', null)

    console.log(`signout response`, response);
  }
)

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async data => {
    try {
      const user =  firebase.auth(fbApp).currentUser

      console.log(`user`, user)

      const userOptions = {
        photoURL: data.photoURL ,
      }
    
      const response = await user.updateProfile(userOptions)
      console.log(`response`, response)
      return true;
    } catch (error) {
      console.log(`error`, error)
      throw new Error(error.message)
    }
    
  }

)

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(`action`, action)
      state.data = action.payload
      state.isAuth = Boolean(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(signInUser.pending, state => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
      })

      .addCase(signUpUser.pending, state => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(signOutUser.pending, state => {
        state.loading = true;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = null;
        state.isAuth = false;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
      })
  }
})

export const { setUser } = authReducer.actions;

export default authReducer.reducer;