// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import {News} from './types';
const baseQuery = fetchBaseQuery({
  baseUrl: Config.BASE_URL,
  prepareHeaders(headers) {
    if (Config.X_RAPID_API_KEY) {
      headers.set('X-RapidAPI-Key', Config.X_RAPID_API_KEY);
    }
    if (Config.X_RAPID_API_HOST) {
      headers.set('X-RapidAPI-Host', Config.X_RAPID_API_HOST);
    }
    return headers;
  },
});
// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: baseQuery,
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getNews: builder.query<News[], void>({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/article-date/01-04-2021',
      transformResponse(baseQueryReturnValue: any) {
        let result = baseQueryReturnValue.slice(0, 20);
        console.log({result});
        return result;
      },
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {useGetNewsQuery} = apiSlice;
