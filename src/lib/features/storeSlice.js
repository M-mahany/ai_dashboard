import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: null,
  name: null,
};

const storeSlice = createSlice({
  name: 'storeSlice',
  initialState,
  reducers: {
    setStore: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
    },
    resetStore: (state) => {
      state._id = null;
      state.name = null;
    },
  },
});

export const { setStore, resetStore } = storeSlice.actions;
export default storeSlice.reducer;
