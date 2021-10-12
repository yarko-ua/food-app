import firebase from 'firebase'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fbApp, { fbdb } from 'firebaseconfig/firebase';
import { PATH_TO_USERS_PUBLIC_STORAGE } from "constans/constants";
// import firebase from 'firebase/app'
import { uploadToStore } from "features/app/fileUploader/fileUploaderSlice";
import { requestReauth, signInUser, signOutUser, signUpUser, updateUser } from "features/auth/authSlice";
import { UPDATE_EMAIL, UPDATE_PASSWORD } from 'features/auth/constants';

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
  loading: false,
  reauth: false,
  tempData: null
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
  async ({password}, thunkAPI) => {
    const user = firebase.auth(fbApp).currentUser

    if(password) {
      try {
        const updatingPass = await user.updatePassword(password)

        console.log(`updatingPass`, updatingPass)

        return {
          reauth: false,
          password
        }
      } catch (error) {
        console.log(`error`, error)

        if (error.code === 'auth/requires-recent-login') {
          console.log('show login modal');

          const reauth = thunkAPI.dispatch(requestReauth(UPDATE_PASSWORD))

          console.log(`reauth`, reauth)

          return {
            reauth: true,
            password
          }
        }
      }
      
    }
  } 
)

export const updateEmail = createAsyncThunk(
  'user/updateEmail',
  async ({ email, onSuccess = null}, thunkAPI) => {
    const user = firebase.auth(fbApp).currentUser

    console.log(`user`, user)

    if(email) {

      try {
        const updatingEmail = await user.updateEmail(email)
        console.log(`updatingEmail`, updatingEmail) //undefined when success

        const userRef = fbdb.doc(`users/${user.uid}`)

        const updatingUser = await userRef.update({email})

        console.log(`updatingUser`, updatingUser) //undefined when success

        console.log(`onSuccess`, onSuccess)

        onSuccess && onSuccess()

        return {
          reauth: false,
          email
        }

        
      } catch (error) {
        console.log(`error`, error)

        if (error.code === 'auth/requires-recent-login') {
          console.log('show login modal');

          const reauth = thunkAPI.dispatch(requestReauth(UPDATE_EMAIL))

          console.log(`reauth`, reauth)

          return {
            reauth: true,
            email
          }
        }
      }

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
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signOutUser.fulfilled, () => ({...initialState}))
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
      .addCase(updatePassword.fulfilled, (state, action)  => {
        state.loading = false

        if (action.payload.reauth)
          state.tempData = { password: action.payload.password }

      }) 

      .addCase(updateEmail.pending, state  => {
        state.loading = true
      }) 
      .addCase(updateEmail.rejected, state  => {
        state.loading = false
      }) 
      .addCase(updateEmail.fulfilled, (state, action)  => {
        state.loading = false

        if (action.payload.reauth)
          state.tempData = { email: action.payload.email }

        if (!action.payload.reauth) {
          state.data.email = action.payload.email
          state.tempData = null
        }
      }) 
  }
})

export const { clearCurrentUser } = profile.actions

export default profile.reducer