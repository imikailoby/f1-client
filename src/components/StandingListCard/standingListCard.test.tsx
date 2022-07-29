/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import getDriverStandingsReponse from '../../../mocks/responses/getDriverStandingsReponse.json';
import { StandingsListItem } from '../../interfaces/standingsLists';
import { StandingListCard } from '.';

const MOCKED_DATA = getDriverStandingsReponse.MRData.StandingsTable.StandingsLists as unknown as StandingsListItem[];

describe('<StandingListCard />', () => {
  it('renders with driver info without crashing', () => {
    const { container } = render(
      <StandingListCard
        onClickCallback={() => undefined}
        totalItems={MOCKED_DATA.length}
        index={0}
        data={MOCKED_DATA}
        style={{ margin: 0 }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('renders with loading state without crashing', () => {
    const { container } = render(
      <StandingListCard
        onClickCallback={() => undefined}
        totalItems={MOCKED_DATA.length + 1}
        index={MOCKED_DATA.length}
        data={MOCKED_DATA}
        style={{ margin: 0 }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('should handle click by content block', () => {
    const onClickCallback = jest.fn();
    const { container } = render(
      <StandingListCard
        onClickCallback={onClickCallback}
        totalItems={MOCKED_DATA.length}
        index={0}
        data={MOCKED_DATA}
        style={{ margin: 0 }}
      />,
    );

    container.getElementsByClassName('content');
    fireEvent.click(container.getElementsByClassName('content')[0]);
    expect(onClickCallback).toHaveBeenCalled();
  });
});
