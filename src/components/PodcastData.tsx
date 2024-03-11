import { Link } from 'react-router-dom';
import styles from './styles/PodcastData.module.scss';

/**
 * Interface representing the properties of a podcast.
 */
interface PodcastProps {
  id: number;
  image: string;
  name: string;
  author: string;
  description: string;
}

/**
 * Functional component to display podcast data.
 * @param props - Props containing podcast information.
 * @returns JSX.Element representing the PodcastData component.
 */
function PodcastData({ props }: { props: PodcastProps }): JSX.Element {
  return (
    <div className={styles['podcast-description']}>
      {/* Link to podcast details */}
      <Link className={styles['link']} to={`/podcast/${props.id}`}>
        {/* Podcast image */}
        <img src={props.image} alt={props.name} />
        {/* Podcast name and author */}
        <div className={styles['podcast-description__name']}>
          <h3>{props.name}</h3>
          <p>by {props.author}</p>
        </div>
      </Link>
      {/* Display description if available */}
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
