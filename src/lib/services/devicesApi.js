import { userRequestAPI } from './mainApi';

const enhancedApi = userRequestAPI.enhanceEndpoints({
  addTagTypes: ['stores'],
});

export const devicesApi = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    getMyDevices: build.query({
      query: (query = {}) => {
        const searchQuery = new URLSearchParams(query);
        return { url: `devices/mine?${searchQuery.toString()}` };
      },
    }),
    getDeviceHealth: build.query({
      query: (id) => `devices/${id}/system-health`,
    }),
    getDeviceLogs: build.query({
      query: (id) => `devices/${id}/logs`,
    }),
  }),
});

export const { useGetMyDevicesQuery, useGetDeviceHealthQuery, useGetDeviceLogsQuery } = devicesApi;
