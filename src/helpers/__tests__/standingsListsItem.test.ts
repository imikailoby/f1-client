import { getDriverAndSeasonInfo } from '../standingsListsItem.helpers';
import getDriverStandingsReponse from '../../../mocks/responses/getDriverStandingsReponse.json';
import { StandingsListItem } from '../../interfaces/standingsLists';

const MOCKED_ITEM = getDriverStandingsReponse.MRData.StandingsTable.StandingsLists[0] as unknown as StandingsListItem;

describe('getDriverAndSeasonInfo()', () => {
  test('returns formatted object data when item presented', () => {
    const formattedData = getDriverAndSeasonInfo(MOCKED_ITEM);

    expect(formattedData).toStrictEqual({
      season: MOCKED_ITEM.season,
      number: MOCKED_ITEM.DriverStandings[0].Driver.permanentNumber || 'N/A',
      firstName: MOCKED_ITEM.DriverStandings[0].Driver.givenName,
      lastName: MOCKED_ITEM.DriverStandings[0].Driver.familyName,
      car: MOCKED_ITEM.DriverStandings[0].Constructors[0].name,
      pts: `${MOCKED_ITEM.DriverStandings[0].points} PTS`,
    });
  });

  test('returns formatted loading data when item undefined', () => {
    const formattedData = getDriverAndSeasonInfo(undefined);

    expect(formattedData).toStrictEqual({
      season: '...',
      number: '...',
      firstName: 'Loading',
      lastName: '...',
      car: '...',
      pts: '...',
    });
  });
});
