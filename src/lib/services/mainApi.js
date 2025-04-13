import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQueryWithToken = fetchBaseQuery({
  baseUrl: '/api/v1/',
  prepareHeaders: (headers, { _getState }) => {
    const token = Cookies.get('authToken');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQueryWithToken(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    // Handle 401,403 Unauthorized error
    Cookies.remove('authToken');
    window.location.href = '/auth/login';
  }

  return result; // Return the result, including any errors
};

export const userRequestAPI = createApi({
  reducerPath: 'userRequestAPI',
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});

export const publicRequestAPI = createApi({
  reducerPath: 'publicRequestAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
  }),
  endpoints: () => ({}),
});
