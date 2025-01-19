import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  message: '',
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
      state.message = action.payload || 'Loading...';
    },
    stopLoading: (state) => {
      state.isLoading = false;
      state.message = '';
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
