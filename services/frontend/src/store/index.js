// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userAuthApi } from '../services/userAuthApi';
import { fetchProduct } from '../services/fetchProduct';
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';
import snackbarReducer from '../features/snackbarSlice';
import loadingReducer from '../features/loadingSlice'; // Import loading slice
import loadingMiddleware from '../middleware/loadingMiddleware'; // Import the custom middleware

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [fetchProduct.reducerPath]: fetchProduct.reducer,
    auth: authReducer,
    user: userReducer,
    snackbar: snackbarReducer,
    loading: loadingReducer, // Add loading slice to the reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAuthApi.middleware)
      .concat(fetchProduct.middleware)
      .concat(loadingMiddleware), // Add custom loading middleware
});

setupListeners(store.dispatch);
