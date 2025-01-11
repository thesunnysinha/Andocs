import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../services/userAuthApi";
import { fetchProduct } from "../services/fetchProduct";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import snackbarReducer from "../features/snackbarSlice";

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [fetchProduct.reducerPath]: fetchProduct.reducer,
    auth: authReducer,
    user: userReducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAuthApi.middleware,
      fetchProduct.middleware
    ),
});
setupListeners(store.dispatch);
