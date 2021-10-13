import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { imagesRef } from './fileUploaderAPI';
// import firebase from 'firebase/app';
import { fbStorageConfig } from 'firebaseconfig/firebase';
import { PATH_TO_IMAGES_STORAGE } from 'constants/constants';

const initialState = {
  filesCount: 0,
  data: [],
  loading: false,
  status: null,
  remoteStorage: {
    data: null
  }, 
}

const readAsDataURL = (file) => {
  return new Promise(function(resolve,reject){
    let fr = new FileReader();

    fr.onload = function(){
      resolve({url: fr.result, name: file.name, type: file.type});
    };

    fr.onerror = function(){
        reject(fr);
    };

    fr.readAsDataURL(file);
  });
}

export const uploadToStore = createAsyncThunk(
  'uploader/uploadToStore',
  async ({ storeReference = PATH_TO_IMAGES_STORAGE, key = null }, thunkAPI) => {

    const state = thunkAPI.getState()
    const files = state.files.data

    if (files && files.length) {
      const filesToUpload = []

      const fullStoreRef = key ? fbStorageConfig[storeReference](key) : fbStorageConfig[storeReference];

      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          
          filesToUpload.push(
            fullStoreRef
              .child(file.name)
              .putString(file.url, 'data_url', {contentType: file.type})
              .then(snapshot => snapshot.ref.getDownloadURL())
          )
        }
  
        const upload = await Promise.allSettled(filesToUpload)
  
        console.log(`upload`, upload)
  
        const photos = upload
          .filter(({status}) => status === 'fulfilled')
          .map(({value}) => value)

        return photos

      } catch (error) {
        console.log(`error`, error)
        throw new Error('uploading photos failed')
      }
    }

    return null
  }
)

export const uploadFiles = createAsyncThunk(
  'uploader/uploadFiles',
  async (files, state) => {
    console.log(`files`, files)

    const { filesList } = state.getState().files

    console.log(`filesList`, filesList)

      if (files.length) {
        const readers = [];

        for (let i = 0; i < files.length; i++) {
          readers.push(readAsDataURL(files[i]))
        }

        try {
          const uploadedFiles = await Promise.allSettled(readers)

          return uploadedFiles.filter(file => file.status === 'fulfilled').map(file => file.value)

        } catch (e) {
          console.log(`e`, e)

          throw new Error('Upload failed')
        }
      }
  }
)

export const uploaderSlice = createSlice({
  name: 'uploader',
  initialState,
  reducers: {
    removeFile: (state, action) => {
      state.data = state.data.filter(file => file.name !== action.payload)
      state.filesCount = state.data.length
    },
    clearFiles: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(uploadToStore.pending, state => {
        state.loading = true
      })
      .addCase(uploadToStore.fulfilled, (state, action) => {
        state.loading = false;
        console.log(`action`, action);

        if (action.payload && action.payload.length) {

          state.remoteStorage.data = action.payload; 
        }
        
      }) 
      .addCase(uploadToStore.rejected, (state, action) => {
        state.loading = false;
        console.log(`action`, action);
      }) 
      .addCase(uploadFiles.pending, state => {state.loading = true})
      .addCase(uploadFiles.rejected, (state, action) => {
        console.log(`uploading failed`, action)
        state.loading = false
        state.status = action.error.message
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.loading = false
        state.status = 'ok'
        console.log(`action`, action)

        for (let i = 0; i < action.payload.length; i++) {
          const element = action.payload[i];
          
          if (!state.data.find(file => file.name === element.name)) {
            state.data.push(element);
          }
        }

        state.filesCount = state.data.length
      });
  }
})

export const { removeFile, clearFiles } = uploaderSlice.actions

export default uploaderSlice.reducer;