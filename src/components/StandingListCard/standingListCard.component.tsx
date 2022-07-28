import { memo, useEffect, useMemo, useState } from 'react';
import { ListChildComponentProps } from 'react-window';
import { StandingsListItem } from '../../interfaces/standingsLists';
import { loadAndCacheDriverAvatar } from '../../helpers/driver.helpers';
import styles from './standingListCard.module.scss';
import { getDriverAndSeasonInfo } from '../../helpers/standingsListsItem.helpers';

interface Props extends ListChildComponentProps<StandingsListItem[]> {
  onClickCallback: (item: StandingsListItem | null) => void;
  totalItems: number;
}

export const StandingListCard = memo(function StandingsListCard(props: Props) {
  const { index, data, style, totalItems, onClickCallback } = props;
  const [driverAvatar, setDriverAvatar] = useState<string | null>(null);

  const isLastElement: boolean = useMemo(() => totalItems === index + 1, [totalItems, index]);

  const item: StandingsListItem | undefined = useMemo(() => data[index], [data, index]);
  const driverAndSeasonInfo = useMemo(() => getDriverAndSeasonInfo(item), [item]);

  useEffect(() => {
    if (item && !driverAvatar) {
      const driver = item.DriverStandings[0];
      loadAndCacheDriverAvatar(driver.Driver.code, driver.Driver.url, setDriverAvatar);
    }
  }, [item, driverAvatar]);

  return (
    <div className={`${styles.card} ${isLastElement ? styles.last : ''}`} style={style}>
      <p className={styles.label}>{driverAndSeasonInfo.season}</p>
      <div className={styles.content} onClick={() => onClickCallback(item || null)}>
        <div className={styles.contentWrapper}>
          <div className={styles.driver}>
            <div className={styles.avatar}>
              {driverAvatar ? <img src={driverAvatar} alt="driver avatar" loading='lazy' /> : <span>...</span>}
              <span className={styles.number}>{driverAndSeasonInfo.number}</span>
            </div>
            <p className={styles.name}>
              {driverAndSeasonInfo.firstName} <b>{driverAndSeasonInfo.lastName}</b>
            </p>
            <p className={styles.car}>{driverAndSeasonInfo.car}</p>
          </div>
          <p className={styles.pts}>{driverAndSeasonInfo.pts}</p>
        </div>
      </div>
    </div>
  );
});

export default StandingListCard;
