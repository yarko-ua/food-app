import { configureStore } from '@reduxjs/toolkit';
import uploaderReducer from 'features/app/fileUploader/fileUploaderSlice';
import listReducer from 'features/app/listHandler/listHandlerSlice';
import listsReducer from 'features/app/userLists/userListsSlice';
import { listApi } from './api';
import authReducer from 'features/auth/authSlice';
import productReducer from 'features/product/productSlice'
import notification from 'features/notification/notificationSlice'
import userReducer from 'features/app/profile/profileSlice' 
import friendsReducer from 'features/app/friends/friendsSlice'
// import modalReducer from 'features/modal/modalSlice'


export const store = configureStore({
  reducer: {
    notification,
    files: uploaderReducer,
    fbList: listReducer,
    lists: listsReducer,
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    friends: friendsReducer,
    // modal: modalReducer,
    [listApi.reducerPath]: listApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listApi.middleware)
});


// store.subscribe(store.dispatch);
