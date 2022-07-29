import { WIKI_API_URL } from '../constants';

export const getWikipediaArticleImage = async (url: string): Promise<string | null> =>
  new Promise((resolve) => {
    // eslint-disable-next-line no-useless-escape
    const regexp = new RegExp('[^/]+$');
    const array = regexp.exec(url);
    if (array === null || !array[0]) {
      return resolve(null);
    }

    const fn = array[0];
    const params = `?action=query&origin=*&format=json&prop=pageimages&titles=${fn}&pithumbsize=100`;
    const wikipediaApiUrl = `${WIKI_API_URL}${params}`;
    fetch(wikipediaApiUrl, { method: 'GET' })
      .then(async (res) => {
        const json = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pages: any[] = Object.values(json.query.pages);
        resolve(pages.length ? pages[0]?.thumbnail?.source : null);
      })
      .catch(() => resolve(null));
  });
