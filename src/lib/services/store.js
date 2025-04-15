import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { publicRequestAPI, userRequestAPI } from './mainApi';
import storeReducer from '../features/storeSlice';

export const store = configureStore({
  reducer: {
    store: storeReducer,
    [userRequestAPI.reducerPath]: userRequestAPI.reducer,
    [publicRequestAPI.reducerPath]: publicRequestAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userRequestAPI.middleware, publicRequestAPI.middleware),
});

setupListeners(store.dispatch);
