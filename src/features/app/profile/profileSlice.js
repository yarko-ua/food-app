import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../../app/firebase";


export const getUserFullInfo = createAsyncThunk(
  'user/getFullInfo',
  async uid => {
    const user = auth.currentUser
    console.log(`user`, user)

    return user
  }
)

// const profile = createSlice({
//   extraReducers
// })