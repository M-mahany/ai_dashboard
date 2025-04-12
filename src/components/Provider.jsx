'use client';
import { store } from '@/lib/services/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider>
  );
};

export default ReduxProvider;
