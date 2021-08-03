import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { imagesRef } from './fileUploaderAPI';
import firebase from 'firebase/app';

const initialState = {
  filesCount: 0,
  filesList: [],
  loading: false,
  status: null,
}

export const uploadToStore = createAsyncThunk(
  'uploader/uploadToStore',
  async (file) => {

    if ( Array.isArray(file) ) {
      const filesToUpload = [];

      for (let i = 0; i < file.length; i++) {
        filesToUpload.push(
          imagesRef
            .child(file[i].name)
            .put(file[i], {contentType: file[i].type})
            .then(snap => snap.ref.getDownloadURL())
        )
        
      }

      const photos = await Promise.all(filesToUpload);

      console.log(`photos`, photos);

      return photos;

    }


    const result = await imagesRef
      .child(file.name)
      .put(file, {contentType: file.type});

    const downloadURL = await result.ref.getDownloadURL();

    console.log(`result`, result);
    console.log(`downloadURL`, downloadURL);

    return downloadURL;
  }
)

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

export const uploadFiles = createAsyncThunk(
  'uploader/uploadFiles',
  async (files) => {
    console.log(`files`, files);

      if (files.length) {
        const readers = [];

        for (let i = 0; i < files.length; i++) {
          readers.push(readAsDataURL(files[i]))
        }

        try {
          const uploadedFiles = await Promise.all(readers)

          return uploadedFiles

        } catch (e) {
          console.log(`e`, e)

          return null
        }
      }
  }
)

export const uploaderSlice = createSlice({
  name: 'uploader',
  initialState,
  reducers: {
    removeFile: (state, action) => {
      state.filesList = state.filesList.filter(file => file.name !== action.payload)
      state.filesCount = state.filesList.length
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

        if (action.payload) {

          if (Array.isArray(action.payload) ) {
            state.filesList = [...state.filesList, ...action.payload];
          } else {
            state.filesList.push(action.payload);
          }

          state.files = state.filesList.length;
          
        }
        
        console.log(`action`, action);
      }) 
      .addCase(uploadToStore.rejected, (state, action) => {
        state.loading = false;
        console.log(`action`, action);
      }) 
      .addCase(uploadFiles.pending, state => {state.loading = true})
      .addCase(uploadFiles.rejected, (state, action) => {
        console.log(`uploading failed`, action)
        state.loading = false
        state.status = 400
      })
      .addCase(uploadFiles.fulfilled, (state, action) => {
        state.loading = false
        state.status = 200
        console.log(`action`, action)
        if (action.payload)
          state.filesList = [...state.filesList, ...action.payload]
        state.filesCount = state.filesList.length
      });
  }
})

export const { removeFile, clearFiles } = uploaderSlice.actions

console.log(`uploaderSlice`, uploaderSlice)

export default uploaderSlice.reducer;