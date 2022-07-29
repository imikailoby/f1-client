import { memo } from 'react';
import { useGetResultsBySeasonQuery } from '../../api/results.api';
import { Loader } from '../../components/common/Loader';
import { ResultsTable } from '../../components/ResultsTable';
import { WorldChampion } from '../../components/WorldChampion';
import { StandingsListItem } from '../../interfaces/standingsLists';
import styles from './resultsPage.module.scss';

interface Props {
  season: StandingsListItem;
}

export const ResultsPage = memo(function ResultsPage(props: Props) {
  const { season } = props;
  const { data } = useGetResultsBySeasonQuery({ season: season.season });

  return (
    <div className={styles.results}>
      <h1>
        Season <span>{season.season}</span>
      </h1>
      <h3>World champion:</h3>
      <WorldChampion season={season} />
      <h3>Results:</h3>
      {data ? (
        <ResultsTable data={data.Races} championCode={season.DriverStandings[0].Driver.code} />
      ) : (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
});

export default ResultsPage;
