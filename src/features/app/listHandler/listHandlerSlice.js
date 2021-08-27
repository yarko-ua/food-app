import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from 'firebase/app';
import 'firebase/firestore';
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
  async (payload, thunkAPI) => {

    console.log( `payload`, payload)

    const state = thunkAPI.getState()

    const files = state.files.filesList;
    const currentList = state.lists.currentList
    const user = state.user.data

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

    console.log(`photos`, photos); //nophotos ? not added to storage?

    // const { data } = payload

    // console.log(`data`, data)

    // delete data.productPhotos

    // console.log(`data`, data)

    const { name, photos: productPhotos, rating = 0, description } = payload


    // if no variable productRating what to do:
    console.log(`productRating`, rating)

    const createdAt = firebase.firestore.FieldValue.serverTimestamp()

    console.log(`createdAt`, createdAt)

    const productData = {
      ...payload, 
      photos, 
      reviewer: user.uid,
      createdAt
    }

    delete productData.files

    console.log(`productData`, productData)

    try {
      const productRef = await fbdb
        .collection('products')
        .add(productData)

      const productDoc = await productRef.get()

        console.log(`productRef`, productRef)
        console.log(`productDoc`, productDoc)
        console.log(`productDoc.data()`, productDoc.data())
      
      const productDocData = productDoc.data()

      const { id: productID } = productRef


      const productShort = {
        name,
        thumb: photos && photos.length ? photos[0] : null,
        id: productID,
        rating,
        description,
        createdAt
      }

      console.log(`productShort`, productShort)
      
      const listDoc = fbdb
      .doc(`users/${user.uid}/lists/${currentList.id}/products/${productID}`)
      const listDocAdd = await listDoc.set(productShort)
      let test = await listDoc.get()

      console.log(`listDoc`, listDoc)
      console.log(`listDoc.get()`, test)
      console.log(`listDoc.get().data()`, test.data())
      console.log(`listDocAdd`, listDocAdd)

      // console.log(`listDoc`, listDoc)
      // console.log(`listDoc.get()`, await listDoc.get())

      // const listUpdate = await listDoc.update({
      //   products: firebase.firestore.FieldValue.arrayUnion(...productShort) //with string works ok
      // })

      // console.log(`listUpdate`, listUpdate)


      // console.log('listItemRef', listItemRef)

      // const listDoc = await fbdb.collection('lists').doc(listItemRef.id).get()

      // if (listItemRef.exists) {
        // const listData = listItemRef.data();

      // }

      // const d = listData.data()
      
      // const { id, path } = listItemRef

      // console.log(`id, path`, id, path)
      productShort.createdAt = productDocData.createdAt.toMillis()

      return productShort

    } catch (error) {
      console.log(`error`, error)
      throw new Error(error.message || error)
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

        // if (action.payload.status === 'success') {
        //   state.myList.push(action.payload.record)
        // }

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