import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { imagesRef } from './fileUploaderAPI';
import firebase from 'firebase/app';

const initialState = {
  files: 0,
  filesList: [],
  loading: false,
}

export const uploadFile = createAsyncThunk(
  'uploader/uploadFile',
  async (file) => {
    const result = await imagesRef
      .child(file.name)
      .put(file, {contentType: file.type})
      .then(snapshot => {
        console.log(`snapshot`, snapshot);
        return snapshot.ref.fullPath;
      });

  //  const result = await imagesRef.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //   (snapshot) => {
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log('Upload is ' + progress + '% done');
  //     switch (snapshot.state) {
  //       case firebase.storage.TaskState.PAUSED: // or 'paused'
  //         console.log('Upload is paused');
  //         break;
  //       case firebase.storage.TaskState.RUNNING: // or 'running'
  //         console.log('Upload is running');
  //         break;
  //       default:
  //         break;
  //     }
  //   }, 
  //   (error) => {
  //     // A full list of error codes is available at
  //     // https://firebase.google.com/docs/storage/web/handle-errors
  //     const err = {status: 'failed', error};

  //     switch (error.code) {
  //       case 'storage/unauthorized':
  //         // User doesn't have permission to access the object
  //         break;
  //       case 'storage/canceled':
  //         // User canceled the upload
  //         break;
  
  //       // ...
  
  //       case 'storage/unknown':
  //         // Unknown error occurred, inspect error.serverResponse
  //         break;
  //       default:
  //         break;
  //     }

  //     return err;
  //   }, 
  //   () => {
  //     // Upload completed successfully, now we can get the download URL
  //     imagesRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //       console.log('File available at', downloadURL);

  //       return {
  //         status: 'success',
  //         fileURL: downloadURL
  //       }
  //     });

      
  //   }
  // );

   console.log(`upload result`, result);
   return result;
  }
)

export const uploaderSlice = createSlice({
  name: 'uploader',
  initialState,
  reducers: {
    uploadFile: state => {

    }
  },
  extraReducers: builder => {
    builder
      .addCase(uploadFile.pending, state => {
        state.loading = true
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.filesList.push(action.payload);
          state.files = state.filesList.length;
        }
        
        console.log(`action`, action);
      }) 
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        console.log(`action`, action);
      }) 
  }
})

export default uploaderSlice.reducer;