import { apiSlice } from '../api/apiSlice.ts';

interface ContactusBody {
  userEmail: string;
  title: string;
  message: string;
}

export const contactusApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    contactus: builder.mutation<null, ContactusBody>({
      query: (credentials) => ({
        url: '/contact-us',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useContactusMutation } = contactusApiSlice;
