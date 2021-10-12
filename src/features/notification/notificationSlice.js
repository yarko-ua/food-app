import { createSlice } from "@reduxjs/toolkit";
import { addUserRecord } from "features/app/listHandler/listHandlerSlice";
import { reauthUser, signInUser } from "features/auth/authSlice";
import { getUserFullInfo, updateEmail, updatePassword } from "features/app/profile/profileSlice";
import { addProductToList } from "features/app/userLists/userListsSlice";

const TYPE_SUCCESS = 'success',
      TYPE_WARNING = 'warning',
      TYPE_ERROR = 'error',
      TYPE_DARK = 'dark',
      TYPE_INFO = 'info',
      TYPE_DEFAULT = 'default'

const initialState = {
  type: TYPE_DEFAULT,
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
      state.type = TYPE_ERROR
      state.message = action.error.message
      state.show = true
    })
    .addCase(addUserRecord.rejected, (state, action) => {
      console.log(`action`, action)
      state.show = true
      state.type = TYPE_ERROR
      state.message = action.error.message
    })
    .addCase(addProductToList.fulfilled, (state) => {
      state.show = true
      state.type = TYPE_SUCCESS
      state.message = 'Product successfully added'
    })
    .addCase(getUserFullInfo.rejected, (state, action) => {
      state.show = true
      state.type = TYPE_ERROR
      state.message = action.error.message
    })

    .addCase(updateEmail.fulfilled, (state, action) => {
      if (!action.payload.reauth) {
        state.show = true
        state.type = TYPE_SUCCESS
        state.message = 'Email successfully updated'
      }
    })
    .addCase(updatePassword.fulfilled, (state, action) => {
      if (!action.payload.reauth) {
        state.show = true
        state.type = TYPE_SUCCESS
        state.message = 'Password successfully updated'
      }
    })

    .addCase(reauthUser.rejected, (state, action) => {
      state.show = true
      state.type = TYPE_ERROR
      state.message = action.error.message
    })
  }
})

export const { resetToast, showToast } = notification.actions 

export default notification.reducer