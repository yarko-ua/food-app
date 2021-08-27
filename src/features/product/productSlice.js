import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fbdb } from "../app/fileUploader/fileUploaderAPI";

const initialState = {
  data: null,
  loading: true
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

      return { id: productID, ...product.data(), createdAt: product.data().createdAt.toMillis() }
    } catch (error) {
      console.log(`error`, error)
      return null;
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
        state.data = action.payload
      })
  }
})

export default product.reducer