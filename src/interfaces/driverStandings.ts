import { Constructor } from './constructor';
import { Driver } from './driver';

export interface DriverStandingsItem {
  Constructors: Constructor[];
  Driver: Driver,
  points: string;
  positionText: string;
  wins: string;
}
