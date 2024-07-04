import { postalCodeApiSlice } from '../api/postalCodeApiSlice.ts';

interface ViaCep {
  erro?: boolean;
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

export const viaCepApiSlice = postalCodeApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    viaCep: builder.query<ViaCep, string>({
      query: (cep) => `${cep}/json`,
    }),
  }),
});

export const { useLazyViaCepQuery } = viaCepApiSlice;
