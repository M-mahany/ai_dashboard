import { userRequestAPI } from './mainApi';

const enhancedApi = userRequestAPI.enhanceEndpoints({
  addTagTypes: ['user'],
});

export const userApi = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    getMyData: build.query({
      query: () => 'users/mine',
      providesTags: ['user'],
    }),
  }),
});

export const { useGetMyDataQuery } = userApi;
