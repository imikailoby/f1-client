import { memo, useMemo } from 'react';
import { ListChildComponentProps } from 'react-window';
import { StandingsListItem } from '../../interfaces/standingsLists';
import styles from './standingListCard.module.scss';
import { getDriverAndSeasonInfo } from '../../helpers/standingsListsItem.helpers';
import { DriverAvatar } from '../common/DriverAvatar';

interface Props extends ListChildComponentProps<StandingsListItem[]> {
  onClickCallback: (item: StandingsListItem | null) => void;
  totalItems: number;
}

export const StandingListCard = memo(function StandingsListCard(props: Props) {
  const { index, data, style, totalItems, onClickCallback } = props;

  const isLastElement: boolean = useMemo(() => totalItems === index + 1, [totalItems, index]);
  const item: StandingsListItem | undefined = useMemo(() => data[index], [data, index]);
  const driverAndSeasonInfo = useMemo(() => getDriverAndSeasonInfo(item), [item]);

  return (
    <div className={`${styles.card} ${isLastElement ? styles.last : ''}`} style={style}>
      <p className={styles.label}>{driverAndSeasonInfo.season}</p>
      <div className={styles.content} onClick={() => onClickCallback(item || null)}>
        <div className={styles.contentWrapper}>
          <div className={styles.driver}>
            <DriverAvatar
              driverStanding={item?.DriverStandings[0]}
              number={driverAndSeasonInfo.number}
              className={styles.avatar}
            />
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
