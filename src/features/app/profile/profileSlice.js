import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from 'firebase/app'

export const getUserFullInfo = createAsyncThunk(
  'user/getFullInfo',
  async uid => {
    const user = firebase.auth().currentUser
    console.log(`user`, user)

    return user
  }
)

// const profile = createSlice({
//   extraReducers
// })