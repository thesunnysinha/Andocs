import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: localStorage.getItem("access_token") || null,
  refresh_token: localStorage.getItem("refresh_token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload.access_token;
    },
    unSetAccessToken: (state) => {
      state.access_token = null;
    },
    setRefreshToken: (state, action) => {
      state.refresh_token = action.payload.refresh_token;
    },
    unSetRefreshToken: (state) => {
      state.refresh_token = null;
    },
  },
});

export const {
  setAccessToken,
  unSetAccessToken,
  setRefreshToken,
  unSetRefreshToken,
} = authSlice.actions;

export default authSlice.reducer;
