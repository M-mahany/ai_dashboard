import { userRequestAPI } from './mainApi';

const enhancedApi = userRequestAPI.enhanceEndpoints({
  addTagTypes: ['stores'],
});

export const devicesApi = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    getMyDevices: build.query({
      query: () => 'devices/mine',
    }),
  }),
});

export const { useGetMyDevicesQuery } = devicesApi;
