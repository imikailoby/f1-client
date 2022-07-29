import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetResultsBySeasonResponse } from '../interfaces/api';
import { API_URL } from '../constants';
import { RaceTable } from '../interfaces/raceTable';
import { transformGetResultsBySeasonResponse } from '../helpers/api.helpers';
import { StandingsListItem } from '../interfaces/standingsLists';

export const resultsApi = createApi({
  reducerPath: 'results',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Results'],
  endpoints: (builder) => ({
    getResultsBySeason: builder.query<RaceTable, { season: StandingsListItem['season'] }>({
      query: ({ season }) => `${season}/results/1.json`,
      providesTags: ['Results'],
      transformResponse: (response: IGetResultsBySeasonResponse) => transformGetResultsBySeasonResponse(response),
    }),
  }),
});

export const { useGetResultsBySeasonQuery } = resultsApi;
