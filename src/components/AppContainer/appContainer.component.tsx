import { Footer } from '../Footer';
import { Header } from '../Header';
import { StandingsListPage } from '../../pages/StandingsListPage';
import { useEffect } from 'react';

export const AppContainer = () => {
  const onUnload = () => {
    sessionStorage.clear();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
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
