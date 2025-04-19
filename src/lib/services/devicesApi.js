import { userRequestAPI } from './mainApi';

const enhancedApi = userRequestAPI.enhanceEndpoints({
  addTagTypes: ['devices', 'deviceKey', 'deviceLogs'],
});

export const devicesApi = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    getMyDevices: build.query({
      query: (query = {}) => {
        const searchQuery = new URLSearchParams(query);
        return { url: `devices/mine?${searchQuery.toString()}` };
      },
      providesTags: ['devices'],
    }),
    getDeviceKey: build.query({
      query: (id) => `devices/${id}/preAuthKey`,
      providesTags: ['deviceKey'],
    }),
    refreshDeviceKey: build.query({
      query: (id) => `devices/${id}/refreshAuthKey`,
      invalidatesTags: ['deviceKey'],
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
      providesTags: ['deviceLogs'],
    }),
    updateDevice: build.mutation({
      query: ({ id, endpoint }) => ({
        url: `devices/${id}/${endpoint}`,
        method: 'POST',
      }),
      invalidatesTags: ['deviceLogs'],
    }),
    registerDeviceToStore: build.mutation({
      query: (storeId) => ({
        url: `devices/${storeId}`,
        method: 'POST',
      }),
      invalidatesTags: ['devices'],
    }),
  }),
});

export const {
  useGetMyDevicesQuery,
  useGetDeviceHealthQuery,
  useGetDeviceLogsQuery,
  useUpdateDeviceMutation,
  useRegisterDeviceToStoreMutation,
  useGetDeviceKeyQuery,
  useRefreshDeviceKeyQuery,
} = devicesApi;
