import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { publicRequestAPI, userRequestAPI } from './mainApi';
import storeReducer from '../features/storeSlice';
import authReducer from '../features/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  version: 1,
};

const rootReducer = combineReducers({
  store: storeReducer,
  auth: authReducer,
  [userRequestAPI.reducerPath]: userRequestAPI.reducer,
  [publicRequestAPI.reducerPath]: publicRequestAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(userRequestAPI.middleware, publicRequestAPI.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
