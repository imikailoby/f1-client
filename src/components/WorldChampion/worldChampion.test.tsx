/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import getDriverStandingsReponse from '../../../mocks/responses/getDriverStandingsReponse.json';
import { StandingsListItem } from '../../interfaces/standingsLists';
import { WorldChampion } from './';

const MOCKED_ITEM = getDriverStandingsReponse.MRData.StandingsTable.StandingsLists[0] as unknown as StandingsListItem;

describe('<WorldChampion />', () => {
  it('renders without crashing', () => {
    const { container } = render(<WorldChampion season={MOCKED_ITEM} />);
    expect(container).toMatchSnapshot();
  });
});
