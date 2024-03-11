import { Link } from 'react-router-dom';
import styles from './styles/PodcastData.module.scss';

interface PodcastProps {
  id: number;
  image: string;
  name: string;
  author: string;
  description: string;
}

function PodcastData({ props }: { props: PodcastProps }) {
  return (
      <div className={styles['podcast-description']}>
        <Link className={styles['link']} to={`/podcast/${props.id}`}>
            <img src={props.image} alt={props.name} />
            <div className={styles['podcast-description__name']}>
            <h3>{props.name}</h3>
            <p>by {props.author}</p>
            </div>
          </Link>
        {props.description && (
          <p>
            <strong>Description:</strong>
            {props.description}
          </p>
        )}
      </div>
  );
}

export default PodcastData;
