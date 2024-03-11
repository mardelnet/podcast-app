import styles from './styles/Header.module.scss';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { RootState } from '../utils/store';

function Header() {
  const loadingData = useSelector((state: RootState) => state.loading.loading);
  
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