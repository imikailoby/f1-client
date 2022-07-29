import { rest } from 'msw';
import { server } from '../../../mocks/server';
import wikipediaApiResponse from '../../../mocks/responses/wikipediaApiResponse.json';
import { WIKI_API_URL } from '../../constants';
import { getWikipediaArticleImage } from '../wikipediaParser';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const MOCKED_URL = 'http://en.wikipedia.org/wiki/Sebastian_Vettel';

describe('getWikipediaArticleImage()', () => {
  test('returns driver avatar url if it is available', async () => {
    server.use(rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(200), ctx.json(wikipediaApiResponse))));

    const result = await getWikipediaArticleImage(MOCKED_URL);
    expect(result).toBe(wikipediaApiResponse.query.pages['6437759'].thumbnail.source);
  });

  test('returns null if wikipedia response does not contain pages', async () => {
    const responseWithoutPages = { ...wikipediaApiResponse, query: { ...wikipediaApiResponse.query, pages: {} } };
    server.use(rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(200), ctx.json(responseWithoutPages))));

    const result = await getWikipediaArticleImage(MOCKED_URL);
    expect(result).toBeNull();
  });

  test('returns null if wikipedia server is unavailable', async () => {
    server.use(rest.get(`${WIKI_API_URL}*`, (_, res, ctx) => res(ctx.status(500))));

    const result = await getWikipediaArticleImage(MOCKED_URL);
    expect(result).toBeNull();
  });

  test('returns null if wrong url passed', async () => {
    const result = await getWikipediaArticleImage('http://wrong.url/test');
    expect(result).toBeNull();
  });
});
