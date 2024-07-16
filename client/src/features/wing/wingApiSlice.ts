import { apiSlice } from '../api/apiSlice.ts';

interface WingBody {
  wingName: string;
}

export const wingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWing: builder.mutation<void, WingBody>({
      query: (body) => ({
        url: '/wing/create',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useCreateWingMutation } = wingApiSlice;
