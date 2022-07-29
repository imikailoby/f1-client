import loaderIcon from '../../../assets/icons/loader.svg';
import styles from './loader.module.scss';

export const Loader = () => (
  <div className={styles.loader}>
    <img src={loaderIcon} alt='loader' />
  </div>
);

export default Loader;
