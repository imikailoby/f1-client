import { StandingsListItem } from '../interfaces/standingsLists';

export const getDriverAndSeasonInfo = (i: StandingsListItem | undefined): {
  season: string;
  number: string;
  firstName: string;
  lastName: string;
  car: string;
  pts: string;
} => {
  const ds = i ? i.DriverStandings[0] : undefined;
  return {
    season: i ? i.season : '...',
    number: ds ? ds.Driver.permanentNumber : '...',
    firstName: ds ? ds.Driver.givenName : 'Loading',
    lastName: ds ? ds.Driver.familyName : '...',
    car: ds ? ds.Constructors[0].name : '...',
    pts: ds ? `${ds.points} PTS` : '...',
  }
};
