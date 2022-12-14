import { Driver } from '../../interfaces/driver';
import { Race } from '../../interfaces/race';
import styles from './resultsTable.module.scss';

interface Props {
  data: Race[];
  championCode: Driver['code'];
}

const COLUMN_TITLE = { round: 'Round', driver: 'Driver', race: 'Race' };

// We don't use virtualization when map items in this component by one simple reason: season results array cannot
// have huge amount of items (max 20-25). So, additional optimization it's not necessary.
export const ResultsTable = ({ data, championCode }: Props) => {
  const isChampion = (d: Driver) => d.code === championCode;

  return (
    <div className={styles.table}>
      <div className={styles.row}>
        {Object.values(COLUMN_TITLE).map((i) => (
          <div key={i}>
            <p>{i}</p>
          </div>
        ))}
      </div>
      {data.map((race) => (
        // highlight row (just adding bold text styles) when race winner is the current season world champion.
        <div key={race.round} className={`${styles.row} ${isChampion(race.Results[0].Driver) ? styles.champion : ''}`}>
          <div data-text={COLUMN_TITLE.round}>
            <p>{race.round}</p>
          </div>
          <div data-text={COLUMN_TITLE.driver}>
            <a href={race.Results[0].Driver.url} target='_blank' rel='noreferrer'>
              {race.Results[0].Driver.givenName} {race.Results[0].Driver.familyName}
            </a>
            <span>{race.Results[0].Constructor.name}</span>
          </div>
          <div data-text={COLUMN_TITLE.race}>
            <a href={race.url} target='_blank' rel='noreferrer'>
              {race.raceName}
            </a>
            <span>{race.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsTable;
