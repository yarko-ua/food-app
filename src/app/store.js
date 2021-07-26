import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import uploaderReducer from '../features/app/fileUploader/fileUploaderSlice';
import listReducer from '../features/app/listHandler/listHandlerSlice';
import { listApi } from './api';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    fbList: listReducer,
    [listApi.reducerPath]: listApi.reducer,
    files: uploaderReducer,
    user: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listApi.middleware)
});


// store.subscribe(store.dispatch);
