import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fbdb } from "../../../app/firebase";
import { PATH_TO_USERS_PUBLIC_STORAGE } from "../../../constants";
// import firebase from 'firebase/app'
import { signInUser, signOutUser, signUpUser, updateUser } from "../../auth/authSlice";
import { uploadToStore } from "../fileUploader/fileUploaderSlice";

const initialState = {
  photoURL: null,
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  friends: null,
  loading: false
}

export const getUserFullInfo = createAsyncThunk(
  'user/getFullInfo',
  async (_, thunkAPI) => {
    const { uid } = thunkAPI.getState().auth.data
    console.log(`get uid`, uid)

    try {
      const userRef = fbdb.doc(`/users/${uid}`);
      const user = await userRef.get()

      if (!user.exists)
        throw new Error('User doesn\'t exists')

      console.log(`user`, user)
      const userData = user.data()
      return {...userData, id: uid }
    } catch (error) {
      console.log(`error`, error)
      throw new Error(error.message) 
    }
  }
)

export const updateProfilePhoto = createAsyncThunk(
  'user/updatePhoto',
  async (_, thunkAPI) => {
    const user = thunkAPI.getState().user

    console.log(`user to update`, user)

    try {
      const uploadPhoto = await thunkAPI.dispatch(uploadToStore({
        storeReference: PATH_TO_USERS_PUBLIC_STORAGE, 
        path: user.id 
      }))
      console.log(`uploadPhoto`, uploadPhoto)
  
      // check if uploadPhoto not empty or not crashed
  
      if (uploadPhoto.payload?.length > 0) {
        const updateCurrentUser = await thunkAPI.dispatch(updateUser(uploadPhoto.payload[0])) // not necessary ??
      
        console.log(`updateCurrentUser`, updateCurrentUser)

        if(updateCurrentUser) {
          const userDoc = await fbdb.doc(`users/${user.id}`).get()

          console.log(`userDoc`, userDoc)
    
          if (userDoc.exists) {
            userDoc.ref.update({
              photoURL: uploadPhoto.payload 
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

const profile = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signOutUser.fulfilled, state => ({...initialState}))
      .addCase(signInUser.fulfilled, (state, action) => {
        const { uid, photoURL, displayName, email } = action.payload
        state.id = uid
        state.photoURL = photoURL
        state.firstName = displayName
        state.email = email
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        const { uid, photoURL, displayName, email } = action.payload
        state.id = uid
        state.photoURL = photoURL
        state.firstName = displayName
        state.email = email
      })
      .addCase(getUserFullInfo.pending, state => {state.loading = true})
      .addCase(getUserFullInfo.rejected, state => {state.loading = false})
      .addCase(getUserFullInfo.fulfilled, (state, action) => {
        console.log(`action.payload`, action.payload)
        state.loading = false
        
        for (const key in action.payload) {
          if (Object.hasOwnProperty.call(action.payload, key)) {
            const value = action.payload[key];
            
            state[key] = value
          }
        }
      })

      .addCase(updateProfilePhoto.fulfilled, (state, action) => {
        state.photoURL = action.payload
      })
  }
})

export default profile.reducer