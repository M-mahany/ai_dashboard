import { userRequestAPI } from './mainApi';

const enhancedApi = userRequestAPI.enhanceEndpoints({
  addTagTypes: ['stores'],
});

export const storesApi = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    getMyStores: build.query({
      query: () => 'stores/mine',
      providesTags: ['stores'],
    }),
    createNewStore: build.mutation({
      query: (body) => ({
        url: 'stores',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['stores'],
    }),
  }),
});

export const { useGetMyStoresQuery, useCreateNewStoreMutation } = storesApi;
