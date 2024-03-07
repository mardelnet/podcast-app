import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchSinglePodcast } from '../utils/fetchData';
import { SinglePodcastType } from '../types/types';
import styles from './Podcast.module.scss';

// Extend PodcastParams from Record<string, string | undefined>
interface PodcastParams extends Record<string, string | undefined> {
  id: string;
}

function Podcast() {
  // Access the route parameter
  const { id } = useParams<PodcastParams>();

  const [podcast, setPodcast] = useState<SinglePodcastType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSinglePodcast(id as string);
        setPodcast(response);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className='main-container'>
      <div className={styles['podcast-container']}>
        <div className={styles['podcast-item']}>aa</div>
        <div className={styles['episodes']}>
          <div className={styles['episodes__quantity']}>
            Episodes: {podcast?.length}
          </div>
          <div className={styles['episodes__list']}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
              {podcast && podcast.map((item: SinglePodcastType, index) => (
                  <tr key={item.trackId} style={{ backgroundColor: index % 2 === 0 ? '#f6f6f6' : '#ffffff' }}>
                    <td>
                      <Link 
                        state={{episodeUrl: item.episodeUrl}} 
                        to={`/podcast/${id}/episode/${item.trackId}`}>
                          {item.trackName}
                      </Link>
                    </td>
                    <td>{item.releaseDate}</td>
                    <td>{item.trackTimeMillis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Podcast;
