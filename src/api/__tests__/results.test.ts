import { rest } from 'msw';
import { resultsApi } from '../results.api';
import { setupTestApiStore } from '../../utils/setupTestApiStore';
import { server } from '../../../mocks/server';
import getResultsBySeasonResponse from '../../../mocks/responses/getResultsBySeasonResponse.json';
import { transformGetResultsBySeasonResponse } from '../../helpers/api.helpers';
import { IGetResultsBySeasonResponse } from '../../interfaces/api';
import { API_URL } from '../../constants';

const storeRef = setupTestApiStore(resultsApi);

const MOCKED_PARAMS = { season: '2005' };

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  storeRef.store.dispatch(storeRef.api.util.resetApiState());
});
afterAll(() => server.close());

describe('Results API', () => {
  describe('getResultsBySeason()', () => {
    test('successful response', () => {
      server.use(
        rest.get(`${API_URL}/${MOCKED_PARAMS.season}/results/1.json`, (_, res, ctx) =>
          res(ctx.status(200), ctx.json(getResultsBySeasonResponse)),
        ),
      );

      return storeRef.store.dispatch(resultsApi.endpoints.getResultsBySeason.initiate(MOCKED_PARAMS)).then((action) => {
        const { status, data, isSuccess } = action;
        const formattedResponse = transformGetResultsBySeasonResponse(
          Object.assign(getResultsBySeasonResponse) as IGetResultsBySeasonResponse,
        );

        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(formattedResponse);
      });
    });
    test('unsuccessful response', () => {
      server.use(rest.get(`${API_URL}/${MOCKED_PARAMS.season}/results/1.json`, (_, res, ctx) => res(ctx.status(500))));

      return storeRef.store.dispatch(resultsApi.endpoints.getResultsBySeason.initiate(MOCKED_PARAMS)).then((action) => {
        const { status, isError } = action;
        expect(status).toBe('rejected');
        expect(isError).toBe(true);
      });
    });
  });
});
