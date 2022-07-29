import { API_URL, FROM_F1_SEASON_YEAR } from '.';

test('necessary variables should have default values if they not provided', () => {
  expect(API_URL).toBe('http://ergast.com/api/f1');
  expect(FROM_F1_SEASON_YEAR).toBe(2005);
});
