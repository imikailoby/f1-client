import { transformGetDriverStandingsApiResponse, transformGetResultsByYearResponse } from '../api.helpers';
import getDriverStandingsReponse from '../../../mocks/responses/getDriverStandingsReponse.json';
import getResultsByYearResponse from '../../../mocks/responses/getResultsByYearResponse.json';
import { IGetDriverStandingsResponse, IGetResultsByYearResponse } from '../../interfaces/api';

describe('transformGetDriverStandingsApiResponse()', () => {
  test('returns result in expected format', () => {
    const response = Object.assign(getDriverStandingsReponse) as IGetDriverStandingsResponse;
    const formattedData = transformGetDriverStandingsApiResponse(response);

    expect(formattedData).toStrictEqual({
      standingsLists: response.MRData.StandingsTable.StandingsLists,
      pagination: {
        limit: response.MRData.limit,
        offset: response.MRData.offset,
        total: response.MRData.total
      }
    })
  });
});

describe('transformGetResultsByYearResponse()', () => {
  test('returns result in expected format', () => {
    const response = Object.assign(getResultsByYearResponse) as IGetResultsByYearResponse;
    const formattedData = transformGetResultsByYearResponse(response);

    expect(formattedData).toStrictEqual(response.MRData.RaceTable);
  });
});
