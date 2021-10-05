import { createSlice } from "@reduxjs/toolkit";
import { addUserRecord } from "../app/listHandler/listHandlerSlice";
import { getUserFullInfo, updateEmail, updatePassword } from "../app/profile/profileSlice";
import { addProductToList } from "../app/userLists/userListsSlice";
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
    resetToast: state => initialState,
    showToast: (state, { payload: {show, type, message} } ) => {
      state.show = show
      state.type = type
      state.message = message
    }
  },
  extraReducers: builder => {
    builder.addCase(signInUser.rejected, (state, action) => {
      state.type = 'error'
      state.message = action.error.message
      state.show = true
    })
    .addCase(addUserRecord.rejected, (state, action) => {
      console.log(`action`, action)
      state.show = true
      state.type = 'error'
      state.message = action.error.message
    })
    .addCase(addProductToList.fulfilled, (state) => {
      state.show = true
      state.type = 'success'
      state.message = 'Product successfully added'
    })
    .addCase(getUserFullInfo.rejected, (state, action) => {
      state.show = true
      state.type = 'error'
      state.message = action.error.message
    })

    .addCase(updateEmail.fulfilled, (state) => {
      state.show = true
      state.type = 'success'
      state.message = 'Email successfully updated'
    })
    .addCase(updatePassword.fulfilled, (state) => {
      state.show = true
      state.type = 'success'
      state.message = 'Password successfully updated'
    })
  }
})

export const { resetToast, showToast } = notification.actions 

export default notification.reducer