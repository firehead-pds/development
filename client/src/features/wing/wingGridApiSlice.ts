import { apiSlice } from '../api/apiSlice.ts';

export interface GridCell {
  id: number;
  row: number;
  col: number;
  user?: {
    firstName: string;
  };
}

export interface Grid {
  name: string;
  rows: number;
  cols: number;
  wing: {};
  gridCells: GridCell[];
}

export const wingGridApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWingGrid: builder.mutation<void, { id: number }>({
      query: (body) => ({
        url: '/wing-grids/create',
        method: 'POST',
        body: {
          wingId: body.id,
          wingGridName: 'Grid',
          rows: 7,
          cols: 5,
        },
      }),
    }),

    getWingGrid: builder.query<Grid, { id: number }>({
      query: (params) => ({
        url: `/wing-grids/${params.id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateWingGridMutation, useGetWingGridQuery } =
  wingGridApiSlice;
