import Cookies from 'js-cookie';
import { userRequestAPI } from './mainApi';

const enhancedApi = userRequestAPI.enhanceEndpoints({
  addTagTypes: ['stores'],
});

export const storesApi = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    getMyStores: build.query({
      query: () => 'stores/mine',
    }),
  }),
});

export const { useGetMyStoresQuery } = storesApi;
