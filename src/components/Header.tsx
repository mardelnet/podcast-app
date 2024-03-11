import styles from './styles/Header.module.scss';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { RootState } from '../utils/store';

/**
 * Header component for the application.
 * @returns JSX.Element representing the Header component.
 */
function Header(): JSX.Element {
  // Select loading state from Redux store
  const loadingData = useSelector((state: RootState) => state.loading.loading);
  
  return (
    <div className={styles['header']}>
      {/* Link to home */}
      <Link to={`/`}>Podcaster</Link>
      {/* Render loader if data is loading */}
      {loadingData && (
        <div className={styles['header__loader']}></div>
      )}
    </div>
  );
}

export default Header;
