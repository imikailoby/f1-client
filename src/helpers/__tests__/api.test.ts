import { transformGetDriverStandingsApiResponse, transformGetResultsBySeasonResponse } from '../api.helpers';
import getDriverStandingsReponse from '../../../mocks/responses/getDriverStandingsReponse.json';
import getResultsBySeasonResponse from '../../../mocks/responses/getResultsBySeasonResponse.json';
import { IGetDriverStandingsResponse, IGetResultsBySeasonResponse } from '../../interfaces/api';

describe('transformGetDriverStandingsApiResponse()', () => {
  test('returns result in expected format', () => {
    const response = Object.assign(getDriverStandingsReponse) as IGetDriverStandingsResponse;
    const formattedData = transformGetDriverStandingsApiResponse(response);

    expect(formattedData).toStrictEqual({
      standingsLists: response.MRData.StandingsTable.StandingsLists,
      pagination: {
        limit: response.MRData.limit,
        offset: response.MRData.offset,
        total: response.MRData.total,
      },
    });
  });
});

describe('transformGetResultsBySeasonResponse()', () => {
  test('returns result in expected format', () => {
    const response = Object.assign(getResultsBySeasonResponse) as IGetResultsBySeasonResponse;
    const formattedData = transformGetResultsBySeasonResponse(response);

    expect(formattedData).toStrictEqual(response.MRData.RaceTable);
  });
});
