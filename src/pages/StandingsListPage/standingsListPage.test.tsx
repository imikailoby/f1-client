/**
 * @jest-environment jsdom
 */
import { rest } from 'msw';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { server } from '../../../mocks/server';
import { driverStandingsApi } from '../../api/driverStandings.api';
import getDriverStandingsReponse from '../../../mocks/responses/getDriverStandingsReponse.json';
import { API_URL, WIKI_API_URL } from '../../constants';
import { StandingsListPage } from '.';
import { clearSessionStorage } from '../../utils/common';
import { setupTestApiStore } from '../../utils/setupTestApiStore';
import React from 'react';

const storeRef = setupTestApiStore(driverStandingsApi);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  clearSessionStorage();
});

const MOCKED_PARAMS = { limit: 5, offset: 0 };

describe('<StandingsListPage />', () => {
  test('renders with loading state without crashing', () => {
    server.use(
      rest.get(`${API_URL}/driverstandings/1.json`, (_, res, ctx) => res(ctx.status(500))),
      rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(500))),
    );

    const { container } = render(
      <Provider store={storeRef.store}>
        <StandingsListPage />
      </Provider>,
    );

    expect(screen.queryByAltText('loader')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('renders with results without crashing', async () => {
    server.use(
      rest.get(`${API_URL}/driverstandings/1.json`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(getDriverStandingsReponse)),
      ),
      rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(500))),
    );

    const { container } = render(
      <Provider store={storeRef.store}>
        <StandingsListPage />
      </Provider>,
    );

    await act(async () => {
      storeRef.store.dispatch(driverStandingsApi.endpoints.getDriverStandings.initiate(MOCKED_PARAMS));
    });

    expect(screen.queryByAltText('loader')).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('update standings list state when new data received', async () => {
    server.use(
      rest.get(`${API_URL}/driverstandings/1.json`, (_, res, ctx) =>
        res(ctx.status(200), ctx.json(getDriverStandingsReponse)),
      ),
      rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(500))),
    );

    const setStateMock = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    render(
      <Provider store={storeRef.store}>
        <StandingsListPage />
      </Provider>,
    );

    expect(setStateMock).toHaveBeenCalledTimes(0);

    await act(async () => {
      storeRef.store.dispatch(driverStandingsApi.endpoints.getDriverStandings.initiate(MOCKED_PARAMS));
    });

    expect(setStateMock).toHaveBeenCalledTimes(1);
  });
});
