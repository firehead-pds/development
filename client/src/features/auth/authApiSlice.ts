import { apiSlice } from '../api/apiSlice.ts';

interface LoginBody {
  email: string;
  password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<null, LoginBody>({
      query: (credentials) => ({
        url: '/auth/local/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
