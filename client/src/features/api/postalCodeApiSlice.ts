import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://viacep.com.br/ws/',
});

export const postalCodeApiSlice = createApi({
  reducerPath: 'viaCepApi',
  baseQuery,
  endpoints: (_builder) => ({}),
});
