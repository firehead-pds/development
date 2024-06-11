import { apiSlice } from '../api/apiSlice.ts';

interface LoginBody {
  email: string;
  password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginBody>({
      query: (credentials) => ({
        url: '/auth/local/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    refresh: builder.query<void, void>({
      query: () => '/auth/refresh',
    }),
  }),
});

export const { useLoginMutation, useRefreshQuery } = authApiSlice;
