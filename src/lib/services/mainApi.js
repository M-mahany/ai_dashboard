import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const userRequestAPI = createApi({
  reducerPath: 'userRequestAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers, { _getState }) => {
      const token = Cookies.get('authToken');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const publicRequestAPI = createApi({
  reducerPath: 'publicRequestAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
  }),
  endpoints: () => ({}),
});
