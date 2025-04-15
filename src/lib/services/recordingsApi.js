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
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page > 1) {
          const cacheArray = currentCache?.data?.recordings || [];
          const newdata = newItems?.data?.recordings;
          return {
            ...newItems,
            data: {
              ...newItems.data,
              recordings: [...cacheArray, ...newdata],
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
      providesTags: ['recordings'],
    }),
    getRecordingById: build.query({
      query: (id) => ({
        url: `recordings/${id}`,
      }),
      transformResponse: (response) => {
        if (response?.data?.peaks) {
          const peaks = response?.data?.peaks ?? [];
          const maxAbs = Math.max(...peaks.map((p) => Math.abs(p))) || 1;
          const normalizedPeaks = peaks.map((p) => p / maxAbs);
          let sortedTranscript = {};
          if (response?.data?.status !== 'pending' && response?.data?.transcript) {
            sortedTranscript = {
              transcript: {
                ...response?.data?.transcript,
                segments: [...response?.data?.transcript.segments].sort((a, b) => a.start - b.start),
              },
            };
          }

          return {
            ...response,
            data: {
              ...response?.data,
              peaks: normalizedPeaks,
              ...sortedTranscript,
            },
          };
        }
        return response;
      },
    }),
    getRecordingDownloadableUrl: build.query({
      query: (id) => ({
        url: `recordings/${id}/download`,
      }),
    }),
    deleteRecordingById: build.mutation({
      query: (id) => ({
        url: `recordings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['recordings'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          // Optimistically update the getAllRecordings cache
          dispatch(
            recordingsApi.util.updateQueryData('getAllRecordings', {}, (draft) => {
              if (draft?.data?.recordings) {
                draft.data.recordings = draft.data.recordings.filter((rec) => rec._id !== id);
                draft.data.totalCount = (draft.data.totalCount || 1) - 1;
              }
            })
          );
        } catch (err) {
          console.error('Failed to delete recording or update cache:', err);
        }
      },
    }),
  }),
});

export const {
  useGetAllRecordingsQuery,
  useGetRecordingByIdQuery,
  useLazyGetRecordingDownloadableUrlQuery,
  useDeleteRecordingByIdMutation,
} = recordingsApi;
