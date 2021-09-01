import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';
import 'firebase/auth'
// import { auth } from '../../app/firebase';
import { loadState, saveState } from '../../helpers/appState';
import { fbApp } from '../app/fileUploader/fileUploaderAPI';
import { signIn, signOut, signUp } from './authAPI';

// const defaultFbAuth = firebase.auth(fbApp);

// console.log(`defaultFbAuth`, defaultFbAuth);
// console.log(`currentUser`, defaultFbAuth.currentUser);


// const data = loadState('user');
// const currentUser = auth.currentUser
// let data = currentUser ?
//   {
//     uid: currentUser.uid,
//     displayName: currentUser.displayName,
//     photoURL: currentUser.photoURL,
//   }
//   : null

// console.log(`userData`, data);

// auth.onAuthStateChanged(user => {
//   console.log(`state changed user`, user)

  // if (user) {
  //   data = {
  //     uid: user.uid,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //   }
  // }
// })

const initialState = {
  auth: null,
  loading: false,
  data: null
};


export const signInUser = createAsyncThunk(
  'auth/signIn',
  async ({ email , password}) => {
    try {
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
    } catch (e) {
      console.log(`e`, e)
      throw new Error(e)
    }
    
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

export const getUserFullInfo = createAsyncThunk(
  'user/getFullInfo',
  async () => {
    // console.log(`auth`, auth)
    const user =  firebase.auth().currentUser
    console.log(`user !!!!`, user)

    // if (!user) {
    //   const u = firebase.auth().currentUser

    //   console.log(`u`, u)
    // }

    if (user) {
      console.log(`user.toJSON()`, user.toJSON())
    }

    return user.uid
  }
)

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(`action`, action)
      state.data = action.payload
      state.auth = Boolean(action.payload)
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
        state.auth = true;
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
        state.auth = true;
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
        state.auth = false;

        // saveState('user', state);

      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
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

export const { setUser } = authReducer.actions;

export default authReducer.reducer;