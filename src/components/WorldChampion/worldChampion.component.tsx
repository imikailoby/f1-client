import { memo, useMemo } from 'react';
import { getDriverAndSeasonInfo } from '../../helpers/standingsListsItem.helpers';
import { StandingsListItem } from '../../interfaces/standingsLists';
import { DriverAvatar } from '../common/DriverAvatar';
import styles from './worldChampion.module.scss';

interface Props {
  season: StandingsListItem;
}

export const WorldChampion = memo(function WorldChampion({ season }: Props) {
  const driverAndSeasonInfo = useMemo(() => getDriverAndSeasonInfo(season), [season]);

  return (
    <div className={styles.champion}>
      <div className={styles.driver}>
        <DriverAvatar
          driverStanding={season.DriverStandings[0]}
          number={driverAndSeasonInfo.number}
          className={styles.avatar}
        />
        <p className={styles.name}>
          {driverAndSeasonInfo.firstName} <b>{driverAndSeasonInfo.lastName}</b>
        </p>
        <p className={styles.car}>{driverAndSeasonInfo.car}</p>
        <a href={season.DriverStandings[0].Driver.url} className={styles.link} target='_blank' rel='noreferrer'>
          Read more...
        </a>
      </div>
    </div>
  );
});

export default WorldChampion;
