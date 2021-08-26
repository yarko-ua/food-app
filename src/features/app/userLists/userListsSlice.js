import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fbdb } from "../fileUploader/fileUploaderAPI";
import { addUserRecord } from "../listHandler/listHandlerSlice";

const initialState = {
  data: null,
  currentList: null,
  loading: false,
}

export const getUserLists = createAsyncThunk(
  'list/getLists',
  async (arg, thunkAPI) => {
    const uid = thunkAPI.getState().user.data.uid

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
    const uid = thunkAPI.getState().user.data.uid
    console.log(`uid`, uid)

    const lists = thunkAPI.getState().lists.data

    console.log(`lists`, lists)

    // if (lists && lists.length) {
    //   const list = lists.filter(list => list.id === listID)
    //   console.log(`list`, list)
    //   if (list.length > 0) return list[0]
    // }

    // const list = fbdb.collection(`users/${uid}/lists`).doc(listID)
    const listDoc = fbdb.doc(`users/${uid}/lists/${listID}`)

    console.log(`listRef`, listDoc)
    console.log(`listRef.path`, listDoc.path)

    const listRefData = await listDoc.get()

    console.log(`listRefData`, listRefData)
    console.log(`listRefData.ref`, listRefData.ref)

    const listData = listRefData.data()

    console.log(`listRefData.data()`, listData)

    const list = await fbdb.collection(`${listDoc.path}/products`).get()

    console.log(`list`, list )

    const products = list.docs

    console.log(`products`, products )
    console.log(`list.empty`, list.empty )
    console.log(`list.size`, list.size )
    console.log(`list`, list )

    // const listRef = await list.get()

    // const data = listRef.data();
    const data = !list.empty ? 
      products.map(prod => {
        const data = prod.data()
        return {...data, createdAt: (data.createdAt ? data.createdAt.toMillis() : 0) }
      })
      : []
    ;

    console.log(`data`, data)

    const currentList = {
      name: listData.name,
      createdAt: listData.createdAt.toMillis(),
      id: listRefData.id,
      data,
    }

    // console.log(`data`, data)
    // console.log(`data data`, data.data())


    // const response = docs.map(list => ({
    //   ...list.data(),
    //   createdAt: list.data().createdAt.toMillis(),
    //   id: list.ref.id
    // }) )

    // console.log(`response`, response)

    return currentList;
  }
)

const lists = createSlice({
  name: 'userLists',
  initialState,
  reducers: {
    clearList: state => {state.currentList = null}
  },
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
      .addCase(addUserRecord.fulfilled, (state, action) => {
        console.log(`action`, action)
        state.currentList.data.push(action.payload)
      })
  }
})
export const { clearList } = lists.actions
// export const { addRecord, removeRecord } = list.actions

export default lists.reducer