import { MRData } from '../types/mrData';
import { RaceTable } from './raceTable';
import { StandingsListItem } from './standingsLists';

export interface IGetDriverStandingsResponse {
  MRData: MRData<{ StandingsTable: { StandingsLists: StandingsListItem[] } }>
}

export interface IGetResultsByYearResponse {
  MRData: MRData<{ RaceTable: RaceTable }>
}

export interface IGetDriverStandings {
  standingsLists: StandingsListItem[],
  pagination: {
    limit: MRData['limit'];
    offset: MRData['offset'];
    total: MRData['total'];
  }
}
