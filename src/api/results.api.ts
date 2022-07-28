import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetResultsByYearResponse } from '../interfaces/api';
import { API_URL } from '../constants';
import { RaceTable } from '../interfaces/raceTable';
import { transformGetResultsByYearResponse } from '../helpers/api.helpers';

export const resultsApi = createApi({
  reducerPath: 'results',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Results'],
  endpoints: (builder) => ({
    getResultsByYear: builder.query<RaceTable, { year: string }>({
      query: ({ year }) => (`${year}/results/1.json`),
      providesTags: ['Results'],
      transformResponse: (response: IGetResultsByYearResponse) => transformGetResultsByYearResponse(response),
    }),
  }),
});

export const { useGetResultsByYearQuery } = resultsApi;
