import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const storeSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = storeSlice.actions;
export default storeSlice.reducer;
