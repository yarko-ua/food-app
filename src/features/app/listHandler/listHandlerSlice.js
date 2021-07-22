import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fbdb } from "../fileUploader/fileUploaderAPI";

const initialState = {
  myList: [],
  compareList: []
}

export const addUserRecord = createAsyncThunk(
  'list/add',
  async (user, payload) => {
    const response = await fbdb
      .collection(`${user}/list`)
      .add(payload)
      .then(docRef => {
        console.log('docRef', docRef)
        return {status: 'success', payload: docRef}
      })
      .catch(error => {
        console.log(`error`, error)
        return {status: 'failed', error}
      })

    return response;
  }
)

const list = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addRecord : state => {

    }
  },
  extraReducers: builder => {
    builder.addCase(addUserRecord.fulfilled, (state, action) => {
      console.log(`action`, action)

      if (action.status === 'success') {
        state.myList.push(action.payload)
      }

    })
  }
})

export default list.reducer;