import { IGetDriverStandings, IGetDriverStandingsResponse, IGetResultsBySeasonResponse } from '../interfaces/api';
import { RaceTable } from '../interfaces/raceTable';

export const transformGetDriverStandingsApiResponse = (response: IGetDriverStandingsResponse): IGetDriverStandings =>
  ({
    standingsLists: response.MRData.StandingsTable.StandingsLists,
    pagination: {
      limit: response.MRData.limit,
      offset: response.MRData.offset,
      total: response.MRData.total,
    },
  } as IGetDriverStandings);

export const transformGetResultsBySeasonResponse = (response: IGetResultsBySeasonResponse): RaceTable =>
  response.MRData.RaceTable;
