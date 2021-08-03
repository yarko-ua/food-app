import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fbdb, imagesRef } from "../fileUploader/fileUploaderAPI";

const initialState = {
  myList: [
  ],
  compareList: [],
  loading: false
}

export const addUserRecord = createAsyncThunk(
  'list/addRecord',
  async (payload, state) => {

    console.log( `payload`, payload)

    const files = state.getState().files.filesList;

    console.log(`st`, files);

    const filesToUpload = [];

    let photos = null;

    try {
      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          filesToUpload.push(
            imagesRef
              .child(files[i].name)
              .putString(files[i].url, 'data_url',  {contentType: files[i].type})
              .then(snap => snap.ref.getDownloadURL())
          )
          
        }
  
        photos = await Promise.all(filesToUpload);
  
      }
    } catch (error) {
      console.log(`error 1`, error)
    }

    console.log(`photos`, photos);

    const { data, user } = payload
    const { product, productPhotos } = data


    try {
      const productRef = await fbdb
        .collection('products')
        .add({product, photos, reviewer: user})

      const { id: productID } = productRef


      const productShort = {
        product,
        thumb: photos ? photos[0] : null,
        user,
        productID
      }
      
      const listItemRef = await fbdb
      .collection(`lists`)
      .add(productShort)


      console.log('listItemRef', listItemRef)
      console.dir('listItemRef', listItemRef)
      const { id, path } = listItemRef

      console.log(`id, path`, id, path)


      return { status: 'success', record: { id, path, ...productShort } }

    } catch (error) {
      console.log(`error`, error)
      return {status: 'failed', error}
    }

  }
)

export const deleteUserRecord = createAsyncThunk(
  'list/deleteRecord',
  async payload => {
    try {
      const doc = await fbdb.collection('lists').doc(payload).get()
      const data = doc.data()
      const { productID } = data

      const deleteList = await fbdb.collection('lists').doc(payload).delete()
      const deleteProduct = await fbdb.collection('products').doc(productID).delete()

      console.log(`deleteList`, deleteList)
      console.log(`deleteProduct`, deleteProduct)
      console.log(`delete success`)

      return payload;
    } catch (error) {
      console.log(`delete fail`, error)
      
    }
  }
)

export const getUserRecords = createAsyncThunk(
  'list/getAllRecords',
  async payload => {
      try {
        const records = await fbdb.collection('lists').where('user', '==', payload).get()
        const { docs } = records;
        console.log(`records`, records)
        console.log(`records docs`, records.docs)

        const response = [];

        docs.forEach(doc => {

          const { id, path } = doc.ref
          const data = doc.data()
          console.log(`data`, data);
          response.push({id, path, ...data})

        })

        return response;
        // console.log(`records.data()`, records.data())
      } catch (error) {
        console.log(`error`, error)
      }
  }
)

const list = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addRecord : state => {

    },
    removeRecord: (state, action) => {
      state.myList = state.myList.filter(rec => rec.id !== action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addUserRecord.fulfilled, (state, action) => {
        state.loading = false
        console.log(`action`, action)

        if (action.payload.status === 'success') {
          state.myList.push(action.payload.record)
        }

      })
      .addCase(addUserRecord.pending, state => {state.loading = true})
      .addCase(addUserRecord.rejected, state => {state.loading = false})
      .addCase(getUserRecords.pending , state => {state.loading = true})
      .addCase(getUserRecords.fulfilled, (state, action) => {
        state.loading = false
        console.log(`action`, action)

        state.myList = action.payload

      })
      .addCase(deleteUserRecord.pending, state => {state.loading = true})
      .addCase(deleteUserRecord.rejected, state => {state.loading = false})
      .addCase(deleteUserRecord.fulfilled, (state, action) => {
        state.loading = false
        state.myList = (state.myList.filter(rec => rec.id !== action.payload) || [])
      })
  }
})

export const { addRecord, removeRecord } = list.actions

export default list.reducer