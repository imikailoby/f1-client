/**
 * @jest-environment jsdom
 */
import { rest } from 'msw';
import { render } from '@testing-library/react';
import { server } from '../../../../mocks/server';
import getDriverStandingsReponse from '../../../../mocks/responses/getDriverStandingsReponse.json';
import wikipediaApiResponse from '../../../../mocks/responses/wikipediaApiResponse.json';
import { clearSessionStorage } from '../../../utils/common';
import { DriverStandingsItem } from '../../../interfaces/driverStandings';
import { WIKI_API_URL } from '../../../constants';
import { DriverAvatar } from '.';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  clearSessionStorage();
});

const MOCKED_DS = getDriverStandingsReponse.MRData.StandingsTable.StandingsLists[0]
  .DriverStandings[0] as unknown as DriverStandingsItem;

describe('<DriverAvatar />', () => {
  test('renders with loading state without crashing', () => {
    server.use(rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(500))));
    const { container } = render(<DriverAvatar number='??' />);
    expect(container).toMatchSnapshot();
    expect(container.getElementsByTagName('img')).toHaveLength(0);
  });

  test('renders with driver info without crashing', () => {
    server.use(rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(200), ctx.json(wikipediaApiResponse))));
    sessionStorage.setItem(MOCKED_DS.Driver.code, 'https://test.com/avatar.png');
    const { container } = render(<DriverAvatar className='test' number='14' driverStanding={MOCKED_DS} />);
    expect(container).toMatchSnapshot();
    expect(container.getElementsByTagName('img')).toHaveLength(1);
  });
});
