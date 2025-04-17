import { userRequestAPI } from './mainApi';

const enhancedApi = userRequestAPI.enhanceEndpoints({
  addTagTypes: ['devices'],
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
      query: ({ id, query = {} }) => {
        const searchQuery = new URLSearchParams(query);
        return { url: `devices/${id}/logs?${searchQuery?.toString()}` };
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.query.page > 1) {
          const cacheArray = currentCache?.data?.logs || [];
          const newdata = newItems?.data?.logs;
          return {
            ...newItems,
            data: {
              ...newItems.data,
              logs: [...cacheArray, ...newdata],
            },
          };
        } else {
          return newItems;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    updateDevice: build.mutation({
      query: ({ id, endpoint }) => ({
        url: `devices/${id}/${endpoint}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetMyDevicesQuery, useGetDeviceHealthQuery, useGetDeviceLogsQuery, useUpdateDeviceMutation } =
  devicesApi;
