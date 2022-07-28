import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetDriverStandings, IGetDriverStandingsResponse } from '../interfaces/api';
import { API_URL } from '../constants';
import { transformGetDriverStandingsApiResponse } from '../helpers/api.helpers';

export const driverStandingsApi = createApi({
  reducerPath: 'driverStandings',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['DriverStandings'],
  endpoints: (builder) => ({
    getDriverStandings: builder.query<IGetDriverStandings, { limit: number, offset: number }>({
      query: (params) => ({ url: 'driverstandings/1.json', params }),
      providesTags: ['DriverStandings'],
      transformResponse: (response: IGetDriverStandingsResponse) => transformGetDriverStandingsApiResponse(response),
    }),
  }),
});

export const { useGetDriverStandingsQuery } = driverStandingsApi;
