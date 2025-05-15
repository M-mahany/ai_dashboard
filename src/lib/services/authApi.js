import Cookies from 'js-cookie';
import { publicRequestAPI } from './mainApi';
import { setUser } from '../features/authSlice';

const enhancedApi = publicRequestAPI.enhanceEndpoints({
  addTagTypes: ['auth'],
});

export const authApi = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    authLogin: build.mutation({
      query: ({ email, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response) => {
        if (response?.data?.token) {
          Cookies.set('authToken', response.data.token, {
            expires: 7,
            httpOnly: false,
            secure: true,
            sameSite: 'lax',
            path: '/',
          });
        }
        return response.data;
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const user = data?.user;
        dispatch(setUser(user));
      },
    }),
    authRegister: build.mutation({
      query: ({ email, password, firstName, lastName, phone }) => ({
        url: 'auth/register',
        method: 'POST',
        body: {
          email,
          password,
          firstName,
          lastName,
          phone,
        },
      }),
    }),
    authForgotPassword: build.mutation({
      query: ({ email }) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    authResetPassword: build.mutation({
      query: ({ token, password }) => ({
        url: `auth/reset-password/${token}`,
        method: 'PUT',
        body: {
          newPassword: password,
        },
      }),
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useAuthForgotPasswordMutation,
  useAuthResetPasswordMutation,
} = authApi;
