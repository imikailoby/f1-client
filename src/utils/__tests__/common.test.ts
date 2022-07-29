import { clearSessionStorage } from '../common';

test('clearSessionStorage()', async () => {
  sessionStorage.setItem('test', 'value');
  expect(sessionStorage.length).toBe(1);
  clearSessionStorage();
  expect(sessionStorage.length).toBe(0);
});
