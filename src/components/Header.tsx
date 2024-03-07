import styles from './Header.module.scss';

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={styles['header']}>
      <Link to={`/`}>Podcaster</Link>
      <div>Loading...</div>
    </div>
  );
}

export default Header;
