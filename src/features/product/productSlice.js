import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from 'firebase/app'
import { fbdb } from "../../app/firebase";

const initialState = {
  current: null,
  data: null,
  loading: false
}

export const getProduct = createAsyncThunk(
  'product/getData',
  async productID => {
    console.log(`productID`, productID)

    try {
      const product = await fbdb
      .collection('products')
      .doc(productID)
      .get()

      const { ref } = product
      console.log(`product`, product)
      console.log(`product.exists`, product.exists)
      console.log(`ref`, ref)
      console.log(`product.data()`, product.data())

      if (!product.exists) return null;

      return { id: productID, ...product.data(), createdAt: product.data().createdAt?.toMillis() }
    } catch (error) {
      console.log(`error`, error)
      return null;
    }
    
  }
)

export const addProduct = createAsyncThunk(
  'product/add',
  async ({data, plain = true}, thunkAPI) => {
    const state = thunkAPI.getState()
    const files = state.files.remoteStorage.data
    const user = state.auth.data

    console.log(`files`, files)

    const { name, rating = 0, description } = data
    console.log(`productRating`, rating)

    if (data && data.hasOwnProperty('files')) {
      delete data.files
    }

    const createdAt = firebase.firestore.FieldValue.serverTimestamp()

    console.log(`createdAt`, createdAt)

    const productData = {
      ...data,
      photos: files,
      // thumb: files && files.length ? files[0] : null,
      reviewer: user.uid,
      createdAt
    }

    // delete productData.files

    console.log(`productData`, productData)


    try {
      const productRef = await fbdb
        .collection('products')
        .add(productData)

      const productDoc = await productRef.get()

      console.log(`productRef`, productRef)
      // console.log(`productDoc`, productDoc)
      
      const productDocData = productDoc.data()

      // console.log(`productDocData`, productDocData)

      const { id: productID } = productRef


      const productShort = {
        // name,
        ...productDocData,
        thumb: files && files.length ? files[0] : null,
        id: productID,
        // rating,
        // description,
        createdAt: productDocData.createdAt?.toMillis()
      }

      // if (plain) {
      //   productShort.createdAt = productShort.createdAt?.toMillis()
      // }

      console.log(`productShort`, productShort)

      return productShort

    } catch (e) {
      console.log(`e`, e)
      throw new Error(e.message)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (productID, thunkAPI) => {
    try {
      const productRef = fbdb.doc(`products/${productID}`)
      console.log(`productRef`, productRef)
      const { id } = productRef
      await productRef.delete()
      return id
    } catch (error) {
      console.log(`error`, error)
      throw new Error(error.message)
    }
  }
)

const product = createSlice({
  name: 'product',
  initialState,
  reducers: {

  },
  extraReducers: builder => { 
    builder
      .addCase(getProduct.pending, state => {state.loading = true})
      .addCase(getProduct.rejected, state => {state.loading = false})
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false
        state.current = action.payload
      })
      .addCase(addProduct.pending, state => {state.loading = true})
      .addCase(addProduct.rejected, state => {state.loading = false})
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
  }
})

export default product.reducer