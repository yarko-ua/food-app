import { StarTwoTone } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";
import { addUserRecord } from "../app/listHandler/listHandlerSlice";
import { signInUser } from "../auth/authSlice";

const initialState = {
  type: 'default', //success, warning, error, dark, info
  message: '',
  show: false
}

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetToast: state => initialState
  },
  extraReducers: builder => {
    builder.addCase(signInUser.rejected, (state, action) => {
      state.type = 'error'
      state.message = action.error.message
      state.show = true
      console.log(`action`, action)
      // state.message = action.payload
    })
    .addCase(addUserRecord.rejected, (state, action) => {
      console.log(`action`, action)
      state.show = true
      state.type = 'error'
      state.message = action.error.message
    })
    
  }
})

export const { resetToast } = notification.actions 

export default notification.reducer