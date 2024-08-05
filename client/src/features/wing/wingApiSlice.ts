import { apiSlice } from '../api/apiSlice.ts';
import { Roles, WingMembership } from '../auth/authSlice.ts';

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

export interface GetUsersReturn {
  id: number;
  name: string;
  role: Roles;
  status: Status;
  sentByCurrentUser: boolean;
}

export enum Status {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
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
    validateInvite: builder.query<Wing, string | undefined>({
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
    getUsers: builder.query<GetUsersReturn[], number | undefined>({
      query: (id) => ({
        url: `wing-membership/wing-users/${id}`,
        method: 'GET',
      }),
    }),
    createFriendRequest: builder.mutation<void, { receiverId: number }>({
      query: (body) => ({
        url: 'friendship/create',
        method: 'POST',
        body: body,
      }),
    }),
    acceptFriendRequest: builder.mutation<void, { requestId: number }>({
      query: (body) => ({
        url: 'friendship/accept-request',
        method: 'PATCH',
        body: body,
      }),
    }),
    deleteFriendRequest: builder.mutation<void, { friendId: number }>({
      query: (body) => ({
        url: 'friendship/delete',
        method: 'DELETE',
        body: body,
      }),
    }),
    getWings: builder.query<WingMembership[], void>({
      query: () => ({
        url: 'wing-membership/get-wings',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateWingMutation,
  useGenerateInviteMutation,
  useLazyValidateInviteQuery,
  useJoinWingMutation,
  useGetUsersQuery,
  useLazyGetWingsQuery,
  useCreateFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useDeleteFriendRequestMutation,
} = wingApiSlice;
