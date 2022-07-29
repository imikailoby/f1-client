import { Footer } from '../Footer';
import { Header } from '../Header';
import { StandingsListPage } from '../../pages/StandingsListPage';
import { useEffect } from 'react';
import { clearSessionStorage } from '../../utils/common';

export const AppContainer = () => {
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
