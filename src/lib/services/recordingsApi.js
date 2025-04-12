import { userRequestAPI } from './mainApi';

const enhancedApi = userRequestAPI.enhanceEndpoints({
  addTagTypes: ['recordings'],
});

export const recordingsApi = enhancedApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRecordings: build.query({
      query: (query = {}) => {
        const searchQuery = new URLSearchParams(query);
        return { url: `recordings?${searchQuery.toString()}` };
      },
    }),
    getRecordingById: build.query({
      query: (id) => ({
        url: `recordings/${id}`,
      }),
      transformResponse: (response) => {
        if (response?.data?.peaks) {
          return {
            ...response,
            data: {
              ...response?.data,
              peaks: response?.data?.peaks.filter((p) => p >= -1 && p <= 1),
            },
          };
        }
        return response;
      },
    }),
  }),
});

export const { useGetAllRecordingsQuery, useGetRecordingByIdQuery } = recordingsApi;
