import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_data: JSON.parse(localStorage.getItem("user_data")) || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user_data = action.payload.user_data;
    },
    unSetUserData: (state, action) => {
      state.user_data = action.payload.user_data;
    },
  },
});

export const { setUserData, unSetUserData } = userSlice.actions;

export default userSlice.reducer;
