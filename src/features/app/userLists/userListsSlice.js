import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fbdb } from "../fileUploader/fileUploaderAPI";

const initialState = {
  data: null,
  currentList: null,
  loading: false,
}

export const getUserLists = createAsyncThunk(
  'list/getLists',
  async (arg, thunkAPI) => {
    const uid = thunkAPI.getState().user.userData.uid

    const lists = await fbdb.collection(`users/${uid}/lists`).get()

    console.log(`lists`, lists)

    const { docs } = lists

    console.log(`lists.docs`, lists.docs)

    const response = docs.map(list => ({
      ...list.data(),
      createdAt: list.data().createdAt.toMillis(),
      id: list.ref.id
    }) )

    console.log(`response`, response)

    return response;
  }
)

export const getUserList = createAsyncThunk(
  'list/getList',
  async (listID, thunkAPI) => {
    const uid = thunkAPI.getState().user.userData.uid
    console.log(`uid`, uid)

    const lists = thunkAPI.getState().lists.data

    console.log(`lists`, lists)

    if (lists && lists.length) {
      const list = lists.filter(list => list.id === listID)
      console.log(`list`, list)
      if (list.length > 0) return list[0]
    }

    const list = fbdb.collection(`users/${uid}/lists`).doc(listID)

    console.log(`list`, list)

    const listRef = await list.get()

    const data = listRef.data();



    // const response = docs.map(list => ({
    //   ...list.data(),
    //   createdAt: list.data().createdAt.toMillis(),
    //   id: list.ref.id
    // }) )

    // console.log(`response`, response)

    return {...data, createdAt: data.createdAt.toMillis()};
  }
)

const lists = createSlice({
  name: 'userLists',
  initialState,
  // reducers: {
  //   getListProducts: (state)
  // }
  extraReducers: builder => {
    builder
      .addCase(getUserLists.pending, state => {state.loading = true})
      .addCase(getUserLists.rejected, state => {state.loading = false})
      .addCase(getUserLists.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        // .map(item => ({...item, createdAt: item.createdAt.toMillis()}))
      })
      .addCase(getUserList.pending, state => {state.loading = true})
      .addCase(getUserList.rejected, state => {state.loading = false})
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = false
        state.currentList = action.payload
        // .map(item => ({...item, createdAt: item.createdAt.toMillis()}))
      })
  }
})

// export const { addRecord, removeRecord } = list.actions

export default lists.reducer