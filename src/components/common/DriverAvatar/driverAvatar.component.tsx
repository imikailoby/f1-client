import { memo, useEffect, useState } from 'react';
import { loadAndCacheDriverAvatar } from '../../../helpers/driver.helpers';
import { DriverStandingsItem } from '../../../interfaces/driverStandings';
import styles from './driverAvatar.module.scss';

interface Props {
  driverStanding?: DriverStandingsItem;
  className?: string;
  number: string;
}

export const DriverAvatar = memo(function DriverAvatar({ driverStanding, className, number }: Props) {
  const [driverAvatar, setDriverAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (driverStanding && !driverAvatar) {
      loadAndCacheDriverAvatar(driverStanding.Driver.code, driverStanding.Driver.url, setDriverAvatar);
    }
  }, [driverStanding, driverAvatar]);

  return (
    <div className={`${styles.avatar} ${className}`}>
      {driverAvatar ? <img src={driverAvatar} alt='driver avatar' loading='lazy' /> : <span>...</span>}
      <span className={styles.number}>{number}</span>
    </div>
  );
});

export default DriverAvatar;
