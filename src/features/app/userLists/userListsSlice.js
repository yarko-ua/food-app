import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from 'firebase/app'
import fbApp, { fbdb } from "../../../app/firebase";
import { retrieveFormData } from "../../../helpers/retrieveFormData";
import { addProduct, deleteProduct } from "../../product/productSlice";
import { uploadToStore } from "../fileUploader/fileUploaderSlice";
import { addUserRecord } from "../listHandler/listHandlerSlice";

const initialState = {
  data: null,
  currentList: null,
  compareList: null,
  loading: false,
}


export const getUserLists = createAsyncThunk(
  'userLists/getLists',
  async (userID = null, thunkAPI) => {
    // later userID need to get lists to compare ?
    const state = thunkAPI.getState()
    const { uid } = state.user.data

    const userListsRef = await fbdb.collection(`users/${userID || uid}/lists`).get()

    const userLists = 
      !userListsRef.empty ?
        userListsRef
          .docs
          .map(list => {
            console.log(`list`, list)
            const data = list.data()
            console.log(`data`, data)

            if (!list.exists) return null

            return {
              ...data, 
              createdAt: data.createdAt?.toMillis() || 0, //todo: replace 0 ?
              id: list.id
            }
          })
          .filter(list => list)
        : []

    console.log(`userListsRef`, userListsRef)
    console.log(`userLists`, userLists)

    return userLists
  }
)

export const getUserList = createAsyncThunk(
  'userLists/getList',
  async (listID, thunkAPI) => {
    const { uid } = thunkAPI.getState().user.data
    console.log(`uid`, uid)

    const lists = thunkAPI.getState().lists.data

    console.log(`lists`, lists)

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
      createdAt: listData.createdAt?.toMillis() || 0,
      id: listRefData.id,
      data,
    }

    return currentList;
  }
)

export const addNewList = createAsyncThunk(
  'userLists/addNewList',
  async (data, thunkAPI) => {
    const uid = thunkAPI.getState().user.data.uid

    try {
      const listRef = await fbdb.collection(`users/${uid}/lists`).add({
        name: data.name,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
  
      console.log(`listRef`, listRef)

      const listDoc = await listRef.get()

      console.log(`listDoc`, listDoc)



      return {
        name: data.name,
        createdAt: listDoc.data().createdAt.toMillis(),
        id: listRef.id
      }


    } catch (error) {
      console.log(`error`, error)
      throw new Error(error)
    }
  }
)

export const addProductToList = createAsyncThunk(
  'list/addProduct',
  async (data, thunkAPI) => {  
    const uploadFiles = await thunkAPI.dispatch(uploadToStore())
    const files = uploadFiles.payload

    console.log(`uploadFiles`, uploadFiles) //get .payload
    console.log(`files`, files)

    const productAdd = await thunkAPI.dispatch(addProduct(data))
    console.log(`product`, productAdd)
    const product = productAdd.payload

    const state = thunkAPI.getState()

    console.log(`st3`, state)
    const currentList = state.lists.currentList
    const user = state.user.data
    // const product = state.product.data

    // const createdAt = firebase.firestore.FieldValue.serverTimestamp()

    console.log(`productShort`, product)
      
    if (!product) return null

    try {
      const listDoc = fbdb
        .doc(`users/${user.uid}/lists/${currentList.id}/products/${product.id}`)

      const listDocAdd = await listDoc.set(product)
      let test = await listDoc.get()

      console.log(`listDoc`, listDoc)
      console.log(`listDoc.get()`, test)
      console.log(`listDoc.get().data()`, test.data())
      console.log(`listDocAdd`, listDocAdd)

      return {
        ...product, 
        createdAt: product.createdAt.toMillis()
      }

    } catch (error) {
      console.log(`error`, error)
      throw new Error(error.message || error)
    }

  }
)

export const removeList = createAsyncThunk(
  'userLists/removeList',
  async (id, thunkAPI) => {
    try {
      const { uid } = thunkAPI.getState().user.data

      const listRef = fbdb.doc(`users/${uid}/lists/${id}`)
      const listDoc = await listRef.get()

      if (listDoc.exists) {
        const listProductsRef = listRef.collection('products')
        console.log(`listProductsRef`, listProductsRef)

        const listProductsCollection = await listProductsRef.get()
        console.log(`listProductsCollection`, listProductsCollection)

        const deleteListProducts = []

        listProductsCollection.forEach(product => {
          console.log(`product`, product)
          if (product.exists) {
            const productRef = product.ref
            deleteListProducts.push(productRef.delete())
          }
        })

        const result = await Promise.all(deleteListProducts)
        console.log(`result`, result)

        const isDelete = await listRef.delete()
        console.log(`isDelete`, isDelete)
      }
      console.log(`listRef`, listRef)
      console.log(`listDoc`, listDoc)
      return id;
    } catch (error) {
        console.log(`error`, error)
    }
  }
)

// y8jliavlX1p0iLo87gS6

export const removeProductFromList = createAsyncThunk(
  'userLists/removeProduct',
  async (productID, thunkAPI) => {
    try {
      const { currentList } = thunkAPI.getState().lists
      const { uid } = thunkAPI.getState().user.data
      const productRef = fbdb.doc(
        `users/${uid}/lists/${currentList.id}/products/${productID}`
      )

      console.log(`productRef`, productRef)
      const { id } = productRef

      await productRef.delete()

      try {
        const deleteProd = await thunkAPI.dispatch(deleteProduct(productID))
        console.log(`deleteProd`, deleteProd)
      } catch (error) {
        console.log(`error`, error)
        throw new Error(error.message)
      }


      return id

    } catch (error) {
      console.log(`error`, error)
      throw new Error(error.message)
      
    }
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
      .addCase(addProductToList.pending, state => {
        state.loading = true
      })
      .addCase(addProductToList.rejected, state => {
        state.loading = false
      })
      .addCase(addProductToList.fulfilled, (state, action) => {
        console.log(`action`, action)
        if(action.payload) {
          state.currentList.data.push(action.payload)
        }
      })
      .addCase(removeList.pending, state => {state.loading = true})
      .addCase(removeList.rejected, state => {state.loading = false})
      .addCase(removeList.fulfilled, (state, action) => {
        state.loading = false
        state.data = state.data
          .filter(list => list.id !== action.payload)
      })
      .addCase(removeProductFromList.pending, state => {state.loading = true})
      .addCase(removeProductFromList.rejected, state => {state.loading = false})
      .addCase(removeProductFromList.fulfilled, (state, action) => {
        state.loading = false
        state.currentList.data = state.currentList.data
          .filter(product => product.id !== action.payload)
      })
      .addCase(addNewList.pending, state => {
        state.loading = true
      })
      .addCase(addNewList.rejected, state => {
        state.loading = false
      })
      .addCase(addNewList.fulfilled, (state, action) => {
        state.loading = false
        if (state.data && state.data.length) {
          state.data.push(action.payload)
        } else {
          state.data = [action.payload]
        }
      })
  }
})
export const { clearList } = lists.actions
// export const { addRecord, removeRecord } = list.actions

export default lists.reducer