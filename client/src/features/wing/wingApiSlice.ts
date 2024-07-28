import { apiSlice } from '../api/apiSlice.ts';
import { Roles } from '../auth/authSlice.ts';

interface WingName {
  wingName: string;
}

interface WingId {
  wingId: number;
}

interface Wing {
  wingId: number;
  wingName: string;
}

interface InviteToken {
  token: string;
}

interface GetUsersReturn {
  name: string;
  role: Roles;
}

export const wingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWing: builder.mutation<void, WingName>({
      query: (body) => ({
        url: '/wing/create',
        method: 'POST',
        body: body,
      }),
    }),
    generateInvite: builder.mutation<InviteToken, WingId>({
      query: (body) => ({
        url: '/wing-membership/generate-invite',
        method: 'POST',
        body: body,
      }),
    }),
    validateInvite: builder.query<Wing, string>({
      query: (params) => ({
        url: `wing-membership/validate-invite/${params}`,
        method: 'GET',
      }),
    }),
    joinWing: builder.mutation<string, InviteToken>({
      query: (body) => ({
        url: '/wing-membership/join-invite',
        method: 'POST',
        body: body,
      }),
    }),
    getUsers: builder.query<GetUsersReturn[], WingId>({
      query: () => ({
        url: 'wing-membership/wing-users',
        method: 'GET',
      }),
    }),
    getWings: builder.query<number, void>({
      query: () => ({
        url: 'wing-membership/get-wings',
        method: 'GET',
      })
    })
  }),
});

export const {
  useCreateWingMutation,
  useGenerateInviteMutation,
  useJoinWingMutation,
  useLazyValidateInviteQuery,
  useGetUsersQuery,
  useGetWingsQuery,
} = wingApiSlice;
