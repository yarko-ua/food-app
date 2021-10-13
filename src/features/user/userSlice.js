import { combineReducers } from "redux"
import { createSlice } from "@reduxjs/toolkit"
import authReducer from "features/auth/authSlice"
import profileReducer from 'features/app/profile/profileSlice'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: null
  },
  reducers: {
    initUser: (state, action) => {
      state = { ...action.payload }
    }
  },
})

const { reducer, actions } = userSlice

export default combineReducers({
  _default: reducer,
  auth: authReducer,
  profile: profileReducer
})