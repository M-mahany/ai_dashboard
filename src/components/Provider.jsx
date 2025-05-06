'use client';
import { persistor, store } from '@/lib/services/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
