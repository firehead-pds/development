import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { logOut } from '../auth/authSlice.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL!,
  credentials: 'include',
});

const baseQueryWithReAuth = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  endpoints: (_builder) => ({}),
});
