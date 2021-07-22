import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import uploaderReducer from '../features/app/fileUploader/fileUploaderSlice';
import { listApi } from './api';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [listApi.reducerPath]: listApi.reducer,
    files: uploaderReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listApi.middleware)
});


// store.subscribe(store.dispatch);
