export const API_URL: string = process.env.REACT_APP_API_URL || 'http://ergast.com/api/f1';
export const CURRENT_ENV: 'development' | 'production' | 'test' = process.env.NODE_ENV as
  | 'development'
  | 'production'
  | 'test';

// Value hardcoded because we cannot time traveling and start first F1 season before 1950;
export const FIRST_F1_SEASON_YEAR = 1950;
export const FROM_F1_SEASON_YEAR = Number(process.env.REACT_APP_FROM_F1_SEASON_YEAR || '2005');

export const WIKI_API_URL = 'https://en.wikipedia.org/w/api.php';
