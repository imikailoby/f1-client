import logo from '../../assets/images/logo.svg';
import styles from './header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <img src={logo} alt='f1 logo' loading='lazy' />
  </header>
);

export default Header;
