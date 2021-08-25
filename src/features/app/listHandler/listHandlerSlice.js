import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from 'firebase/app';
import { fbdb, imagesRef } from "../fileUploader/fileUploaderAPI";

const initialState = {
  myList: [
  ],
  compareList: [],
  loading: false,
  submitting: false
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
  
        photos = await Promise.allSettled(filesToUpload)

        photos = photos.filter(promise => promise.status === 'fulfilled').map(promise => promise.value)
  
      }
    } catch (error) {
      console.log(`error 1`, error)
    }

    console.log(`photos`, photos);

    const { data, user } = payload

    console.log(`data`, data)

    delete data.productPhotos

    console.log(`data`, data)

    const { product, productPhotos, productRating, productDescription } = data


    // if no variable productRating what to do:
    console.log(`productRating`, productRating)

    const createdAt = firebase.firestore.FieldValue.serverTimestamp()

    console.log(`createdAt`, createdAt)

    try {
      const productRef = await fbdb
        .collection('products')
        .add({
          ...data, 
          photos, 
          reviewer: user,
          createdAt
        })

      const { id: productID } = productRef


      const productShort = {
        product,
        thumb: photos ? photos[0] : null,
        user,
        productID,
        productRating,
        productDescription,
        createdAt
      }
      
      const listItemRef = await fbdb
      .collection(`lists`)
      .add(productShort)


      console.log('listItemRef', listItemRef)

      const listDoc = await fbdb.collection('lists').doc(listItemRef.id).get()

      if (listDoc.exists) {
        const listData = listDoc.data();

        productShort.createdAt = listData.createdAt.toMillis()
      }

      // const d = listData.data()
      
      const { id, path } = listItemRef

      console.log(`id, path`, id, path)


      return { status: 'success', record: { id, ...productShort } }

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
        const records = await fbdb.collection(`users/${payload}/lists`).get()
        const { docs } = records;
        console.log(`records`, records)
        console.log(`records docs`, records.docs)

        const response = [];

        docs.forEach(doc => {

          const { id, path } = doc.ref
          const data = doc.data()
          console.log(`data`, data)
          const { createdAt } = data
          response.push({id, path, ...data, createdAt: createdAt.toMillis() })

        })

        return response.reverse();
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
        state.submitting = false
        console.log(`action`, action)

        if (action.payload.status === 'success') {
          state.myList.push(action.payload.record)
        }

      })
      .addCase(addUserRecord.pending, state => {state.submitting = true})
      .addCase(addUserRecord.rejected, state => {state.submitting = false})
      .addCase(getUserRecords.pending , state => {state.loading = true})
      .addCase(getUserRecords.fulfilled, (state, action) => {
        state.loading = false
        console.log(`action`, action)

        state.myList = action.payload ? action.payload : state.myList;

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