import styles from './Header.module.scss';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

function Header() {
  // @ts-ignore
  const loadingData = useSelector(state => state.loading.loading)
  
  return (
    <div className={styles['header']}>
      <Link to={`/`}>Podcaster</Link>
      {loadingData && (
        <div className={styles['header__loader']}></div>
      )}
    </div>
  );
}

export default Header;
