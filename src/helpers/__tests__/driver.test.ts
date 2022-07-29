import { rest } from 'msw';
import { server } from '../../../mocks/server';
import wikipediaApiResponse from '../../../mocks/responses/wikipediaApiResponse.json';
import { WIKI_API_URL } from '../../constants';
import { loadAndCacheDriverAvatar } from '../driver.helpers';
import { clearSessionStorage } from '../../utils/common';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
  clearSessionStorage();
});

const MOCKED_URL = 'http://en.wikipedia.org/wiki/Sebastian_Vettel';
const MOCKED_CODE = 'VET';

describe('loadAndCacheDriverAvatar()', () => {
  server.use(rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(200), ctx.json(wikipediaApiResponse))));

  const callback = jest.fn();

  test('sets avatar url to session storage by by driver code and fires provided callback', async () => {
    await loadAndCacheDriverAvatar(MOCKED_CODE, MOCKED_URL, callback);
    const item = sessionStorage.getItem(MOCKED_CODE);
    expect(item).toBe(wikipediaApiResponse.query.pages['6437759'].thumbnail.source);
  });
  test('should call provided callback', async () => {
    await loadAndCacheDriverAvatar(MOCKED_CODE, MOCKED_URL, callback);
    expect(callback).toHaveBeenCalled();
  });
});
