import { apiSlice } from '../api/apiSlice.ts';
import {Roles, WingMembership} from "../auth/authSlice.ts";

interface WingName {
  wingName: string;
}

interface WingId {
  wingId: number;
}

interface Wing {
  id: number;
  name: string;
}

interface InviteToken {
  token: string;
}

interface GetUsersReturn {
  id: number;
  name: string;
  role: Roles;
  // TODO Enum
  status: string;
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
    getUsers: builder.query<GetUsersReturn[], number>({
      query: (id) => ({
        url: `wing-membership/wing-users/${id}`,
        method: 'GET',
      }),
    }),
    getWings: builder.query<WingMembership[], void>({
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
  useLazyGetWingsQuery,
} = wingApiSlice;
