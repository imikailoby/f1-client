import { Driver } from '../interfaces/driver';
import { getWikipediaArticleImage } from '../utils/wikipediaParser';

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
  } catch (e) {
    console.warn(e);
  } finally {
    if (!cachedImageUrl) {
      sessionStorage.setItem(driverCode, result || '');
    }
    callback(result);
  }
};
