import { apiSlice } from '../api/apiSlice.ts';

interface WingBody {
  wingName: string;
}

interface InviteBody {
  wingId: number;
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
    generateInvite: builder.mutation<string, InviteBody>({
      query: (body) => ({
        url: '/wing-membership/generate-invite',
        method: 'POST',
        body: body,
      }),
    }),
    getWing: builder.query<void, void>({
      query: () => ({
        url: 'wing-membership/user-wing',
        method: 'GET',
      }),
    }),
  }),
});
//pq tu quer cria uma branch? eu já dei o pull já
export const { useCreateWingMutation, useGenerateInviteMutation } =
  wingApiSlice;
