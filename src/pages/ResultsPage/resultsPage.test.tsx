/**
 * @jest-environment jsdom
 */
import { rest } from 'msw';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { server } from '../../../mocks/server';
import { resultsApi } from '../../api/results.api';
import getResultsBySeasonResponse from '../../../mocks/responses/getResultsBySeasonResponse.json';
import getDriverStandingsReponse from '../../../mocks/responses/getDriverStandingsReponse.json';
import { API_URL, WIKI_API_URL } from '../../constants';
import { ResultsPage } from '.';
import { clearSessionStorage } from '../../utils/common';
import { StandingsListItem } from '../../interfaces/standingsLists';
import { setupTestApiStore } from '../../utils/setupTestApiStore';

const storeRef = setupTestApiStore(resultsApi);

const MOCKED_DATA = {
  ...getDriverStandingsReponse.MRData.StandingsTable.StandingsLists[0],
  season: '2005',
} as unknown as StandingsListItem;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  clearSessionStorage();
});

describe('<ResultsPage />', () => {
  test('renders with loading state without crashing', async () => {
    server.use(
      rest.get(`${API_URL}/${MOCKED_DATA.season}/results/1.json`, (_, res, ctx) => res(ctx.status(500))),
      rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(500))),
    );

    const { container } = render(
      <Provider store={storeRef.store}>
        <ResultsPage season={MOCKED_DATA} />
      </Provider>,
    );

    await act(async () => {
      storeRef.store.dispatch(resultsApi.endpoints.getResultsBySeason.initiate({ season: MOCKED_DATA.season }));
    });

    expect(screen.queryByAltText('loader')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('renders with results without crashing', async () => {
    server.use(
      rest.get(`${API_URL}/${MOCKED_DATA.season}/results/1.json`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(getResultsBySeasonResponse)),
      ),
      rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(500))),
    );

    const { container } = render(
      <Provider store={storeRef.store}>
        <ResultsPage season={MOCKED_DATA} />
      </Provider>,
    );

    await act(async () => {
      storeRef.store.dispatch(resultsApi.endpoints.getResultsBySeason.initiate({ season: MOCKED_DATA.season }));
    });

    expect(screen.queryByAltText('loader')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
