import { apiSlice } from '../api/apiSlice.ts';

interface ViaCep {
  erro?: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const viaCepApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    viaCep: builder.query<ViaCep, string>({
      query: (cep) => ({
        url: `https://viacep.com.br/ws/${cep}/json`,
        credentials: 'omit',
      }),
    }),
  }),
});

export const { useLazyViaCepQuery } = viaCepApiSlice;
