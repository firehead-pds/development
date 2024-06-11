import { apiSlice } from '../api/apiSlice.ts';
import Measurements from '../../interfaces/user/Measurements.ts';
import Address from '../../interfaces/user/Address.ts';

interface SignupBody {
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  password: string;
  cpf: string;
  phoneNumber: string;
  measurements: Measurements;
  address: Address;
}

export const signupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<null, SignupBody>({
      query: (credentials) => ({
        url: '/auth/local/signup',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSignupMutation } = signupApiSlice;
