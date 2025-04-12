import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { publicRequestAPI, userRequestAPI } from './mainApi';

export const store = configureStore({
  reducer: {
    [userRequestAPI.reducerPath]: userRequestAPI.reducer,
    [publicRequestAPI.reducerPath]: publicRequestAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userRequestAPI.middleware, publicRequestAPI.middleware),
});

setupListeners(store.dispatch);
