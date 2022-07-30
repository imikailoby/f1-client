import { Footer } from '../Footer';
import { Header } from '../Header';
import { StandingsListPage } from '../../pages/StandingsListPage';
import { useEffect } from 'react';
import { clearSessionStorage } from '../../utils/common';

export const AppContainer = () => {
  // App caches driver avatar urls, which we parse from by the provided wiki url and save in session storage to prevent
  // unnecessary re-fetching. Check getWikipediaArticleImage() and loadAndCacheDriverAvatar() for more info.
  // To prevent cases when the avatar on the wikipedia page has been updated, but we have the old link cached, we
  // clear the store before app unload.
  useEffect(() => {
    window.addEventListener('beforeunload', clearSessionStorage);
    return () => {
      window.removeEventListener('beforeunload', clearSessionStorage);
    };
  }, []);

  return (
    <>
      <Header />
      <StandingsListPage />
      <Footer />
    </>
  );
};

export default AppContainer;
