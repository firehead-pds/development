import { apiSlice } from '../api/apiSlice.ts';
import { Roles } from '../auth/authSlice.ts';

interface WingBody {
  wingName: string;
}

interface InviteBody {
  wingId: number;
}

interface GetUsersReturn {
  name: string;
  role: Roles;
}

interface GetUsersBody {
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
    generateInvite: builder.mutation<{ token: string }, InviteBody>({
      query: (body) => ({
        url: '/wing-membership/generate-invite',
        method: 'POST',
        body: body,
      }),
    }),
    getUsers: builder.query<GetUsersReturn[], GetUsersBody>({
      query: () => ({
        url: 'wing-membership/wing-users',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateWingMutation,
  useGenerateInviteMutation,
  useGetUsersQuery,
} = wingApiSlice;
