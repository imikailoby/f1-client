import { rest } from 'msw';
import { driverStandingsApi } from '../driverStandings.api';
import { setupTestApiStore } from '../../utils/setupTestApiStore';
import { server } from '../../../mocks/server';
import getDriverStandingsReponse from '../../../mocks/responses/getDriverStandingsReponse.json';
import { transformGetDriverStandingsApiResponse } from '../../helpers/api.helpers';
import { IGetDriverStandingsResponse } from '../../interfaces/api';
import { API_URL } from '../../constants';

const storeRef = setupTestApiStore(driverStandingsApi);

const MOCKED_PARAMS = { limit: 5, offset: 0 };

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  storeRef.store.dispatch(storeRef.api.util.resetApiState());
});
afterAll(() => server.close());

describe('Driver Standings API', () => {
  describe('getDriverStandings()', () => {
    test('successful response', () => {
      server.use(
        rest.get(`${API_URL}/driverstandings/1.json`, (_, res, ctx) =>
          res(ctx.status(200), ctx.json(getDriverStandingsReponse)),
        ),
      );

      return storeRef.store
        .dispatch(driverStandingsApi.endpoints.getDriverStandings.initiate(MOCKED_PARAMS))
        .then((action) => {
          const { status, data, isSuccess } = action;
          const formattedResponse = transformGetDriverStandingsApiResponse(
            Object.assign(getDriverStandingsReponse) as IGetDriverStandingsResponse,
          );

          expect(status).toBe('fulfilled');
          expect(isSuccess).toBe(true);
          expect(data).toStrictEqual(formattedResponse);
        });
    });

    test('unsuccessful response', () => {
      server.use(rest.get(`${API_URL}/driverstandings/1.json`, (_, res, ctx) => res(ctx.status(500))));

      return storeRef.store
        .dispatch(driverStandingsApi.endpoints.getDriverStandings.initiate(MOCKED_PARAMS))
        .then((action) => {
          const { status, isError } = action;
          expect(status).toBe('rejected');
          expect(isError).toBe(true);
        });
    });
  });
});
