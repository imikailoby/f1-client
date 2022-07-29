/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import getResultsBySeasonResponse from '../../../mocks/responses/getResultsBySeasonResponse.json';
import { ResultsTable } from '.';
import { Race } from '../../interfaces/race';

const MOCKED_DATA = getResultsBySeasonResponse.MRData.RaceTable.Races as unknown as Race[];
const MOCKED_CHAMPION_DRIVER = MOCKED_DATA[1].Results[0].Driver;

describe('<ResultsTable />', () => {
  it('renders without crashing', () => {
    const { container } = render(<ResultsTable data={MOCKED_DATA} championCode={'test'} />);
    expect(container).toMatchSnapshot();
  });
  it('renders with highlighted champion rows', () => {
    const { container } = render(<ResultsTable data={MOCKED_DATA} championCode={MOCKED_CHAMPION_DRIVER.code} />);
    const totalChampionRows = container.getElementsByClassName('champion').length;
    const dataByChampion = MOCKED_DATA.filter((data) => data.Results[0].Driver.code === MOCKED_CHAMPION_DRIVER.code);
    expect(totalChampionRows).toBe(dataByChampion.length);
  });
});
