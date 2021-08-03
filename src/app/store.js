import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import uploaderReducer from '../features/app/fileUploader/fileUploaderSlice';
import listReducer from '../features/app/listHandler/listHandlerSlice';
import { listApi } from './api';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    files: uploaderReducer,
    fbList: listReducer,
    product: productReducer,
    user: authReducer,
    [listApi.reducerPath]: listApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listApi.middleware)
});


// store.subscribe(store.dispatch);
