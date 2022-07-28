import { DriverStandingsItem } from './driverStandings';

export interface StandingsListItem {
  season: string;
  round: string;
  DriverStandings: [DriverStandingsItem];
}
