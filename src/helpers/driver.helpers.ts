import { Driver } from '../interfaces/driver';
import { getWikipediaArticleImage } from '../utils/wikipediaParser';

// Parse driver avatar from Wikipedia by driver Wikipedia url (or from already cached data by driver code)
export const loadAndCacheDriverAvatar = async (
  driverCode: Driver['code'],
  url: Driver['url'],
  callback: (i: string | null) => void,
) => {
  let result: string | null = null;
  const cachedImageUrl = sessionStorage.getItem(driverCode);
  try {
    if (!cachedImageUrl || (cachedImageUrl && !cachedImageUrl.length)) {
      result = await getWikipediaArticleImage(url);
    } else {
      result = cachedImageUrl;
    }
  } finally {
    if (!cachedImageUrl && result) {
      sessionStorage.setItem(driverCode, result);
    }
    callback(result);
  }
};
