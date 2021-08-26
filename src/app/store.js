import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import uploaderReducer from '../features/app/fileUploader/fileUploaderSlice';
import listReducer from '../features/app/listHandler/listHandlerSlice';
import listsReducer from '../features/app/userLists/userListsSlice';
import { listApi } from './api';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice'
import notification from '../features/notification/notificationSlice'

export const store = configureStore({
  reducer: {
    notification,
    files: uploaderReducer,
    fbList: listReducer,
    lists: listsReducer,
    product: productReducer,
    user: authReducer,
    [listApi.reducerPath]: listApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listApi.middleware)
});


// store.subscribe(store.dispatch);
