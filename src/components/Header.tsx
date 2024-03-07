import styles from './Header.module.scss';
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

function Header() {
  // @ts-ignore
  const selectedProductId = useSelector(state => state.loading.loading)
  
  return (
    <div className={styles['header']}>
      <Link to={`/`}>Podcaster</Link>
      <div>{selectedProductId ? 'is loading' : 'now is loaded'}</div>
    </div>
  );
}

export default Header;
