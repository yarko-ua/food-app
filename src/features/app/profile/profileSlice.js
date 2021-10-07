import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fbApp, { fbdb } from "../../../app/firebase";
import { PATH_TO_USERS_PUBLIC_STORAGE } from "constants/constants";
// import firebase from 'firebase/app'
import { signInUser, signOutUser, signUpUser, updateUser } from "features/auth/authSlice";
import { uploadToStore } from "../fileUploader/fileUploaderSlice";
import firebase from 'firebase'
import { create } from "yup/lib/Reference";

const initialState = {
  data: {
    photoURL: null,
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    friends: null,
  },
  current: {
    photoURL: null,
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    friends: null,
  },
  loading: false
}

export const getUserFullInfo = createAsyncThunk(
  'user/getFullInfo',
  async (userID = null, thunkAPI) => {
    const { uid } = thunkAPI.getState().auth.data
    console.log(`get uid`, uid)
    console.log(`get userID`, userID)

    // ERROR !!! userID is get as some id ??

    try {
      const userRef = fbdb.doc(`/users/${ userID || uid }`);
      const user = await userRef.get()

      console.log(`user doc in get info`, user)

      if (!user.exists)
        throw new Error('User doesn\'t exists')

      console.log(`user`, user)
      const userData = user.data()
      return { 
        data: {
          ...userData,
          id: user.id
        }, 
        userType: userID ?  'current' : 'data'
      }
    } catch (error) {
      console.log(`error`, error)
      throw new Error(error.message) 
    }
  }
)

export const updateProfilePhoto = createAsyncThunk(
  'user/updatePhoto',
  async (_, thunkAPI) => {
    const user = thunkAPI.getState().user.data

    console.log(`user to update`, user)

    try {
      const uploadPhoto = await thunkAPI.dispatch(uploadToStore({
        storeReference: PATH_TO_USERS_PUBLIC_STORAGE, 
        key: user.id 
      }))
      console.log(`uploadPhoto`, uploadPhoto)
  
      // check if uploadPhoto not empty or not crashed
  
      if (uploadPhoto.payload?.length > 0) {
        const updateCurrentUser = await thunkAPI.dispatch(updateUser(uploadPhoto.payload[0])) // not necessary ??
      
        console.log(`updateCurrentUser`, updateCurrentUser)

        if(updateCurrentUser.payload) {
          const userDoc = await fbdb.doc(`users/${user.id}`).get()

          console.log(`userDoc`, userDoc)
    
          if (userDoc.exists) {
            userDoc.ref.update({
              photoURL: uploadPhoto.payload[0]
            })
  
            return uploadPhoto.payload[0]
          }
        }
      }
    } catch (error) {
      console.log(`error`, error)
      throw new Error(error.message)
    }

    
    
  }
)

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (newPass) => {
    const user = firebase.auth(fbApp).currentUser

    if(newPass) {
      const updatingPass = await user.updatePassword(newPass)

      console.log(`updatingPass`, updatingPass)

      return newPass
    }
  } 
)

export const testAction = createAsyncThunk(
  'user/testFunc',
  d => {
    console.log(d)
  }
)

export const updateEmail = createAsyncThunk(
  'user/updateEmail',
  async (newEmail) => {
    const user = firebase.auth(fbApp).currentUser

    console.log(`user`, user)

    if(newEmail) {

      try {
        const updatingEmail = await user.updateEmail(newEmail)
        console.log(`updatingEmail`, updatingEmail)

        const userRef = fbdb.doc(`users/${user.uid}`)

        const updatingUser = await userRef.update({email: newEmail})

        console.log(`updatingUser`, updatingUser)
        
      } catch (error) {
        console.log(`error.message`, error.message)

        if (error.code === 'auth/requires-recent-login') {
          console.log('show login modal');
        }
      }


      

      return newEmail
    }
  } 
)

export const getFriends = createAsyncThunk(
  'user/getFriends',
  async (_, thunkAPI) => {
    const { friends } = thunkAPI.getState().user.data

    const promises = []

    if (friends && friends.length > 0) {
      for (let i = 0; i < friends.length; i++) {
        const friendID = friends[i];

        promises.push(
          thunkAPI.dispatch(getUserFullInfo(friendID))
        )
      }

      const friendsList = (await Promise.allSettled(promises))
        .filter(promise => promise.status === 'fulfilled')
        .map(promise => promise.value)

        console.log(`friendsList`, friendsList)
    }
  }
)

const profile = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearCurrentUser: state => {
      state.current = {
        photoURL: null,
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        friends: null
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(signOutUser.fulfilled, state => ({...initialState}))
      .addCase(signInUser.fulfilled, (state, action) => {
        const { uid, photoURL, displayName, email } = action.payload
        state.data.id = uid
        state.data.photoURL = photoURL
        state.data.firstName = displayName
        state.data.email = email
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        const { uid, photoURL, displayName, email } = action.payload
        state.data.id = uid
        state.data.photoURL = photoURL
        state.data.firstName = displayName
        state.data.email = email
      })
      .addCase(getUserFullInfo.pending, state => {state.loading = true})
      .addCase(getUserFullInfo.rejected, state => {state.loading = false})
      .addCase(getUserFullInfo.fulfilled, (state, action) => {
        console.log(`action.payload`, action.payload)
        state.loading = false
        const { data, userType } = action.payload
        
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const value = data[key];
            
            state[userType][key] = value
          }
        }
      })

      .addCase(updateProfilePhoto.fulfilled, (state, action) => {
        state.data.photoURL = action.payload
      })

      .addCase(updatePassword.pending, state  => {
        state.loading = true
      }) 
      .addCase(updatePassword.rejected, state  => {
        state.loading = false
      }) 
      .addCase(updatePassword.fulfilled, state  => {
        state.loading = false
      }) 

      .addCase(updateEmail.pending, state  => {
        state.loading = true
      }) 
      .addCase(updateEmail.rejected, state  => {
        state.loading = false
      }) 
      .addCase(updateEmail.fulfilled, (state, action)  => {
        state.loading = false
        state.data.email = action.payload
      }) 
  }
})

export const { clearCurrentUser } = profile.actions

export default profile.reducer