import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchSinglePodcast } from '../utils/fetchData';
import { SinglePodcastType } from '../types/types';
import styles from './Podcast.module.scss';
import PodcastData from '../components/PodcastData';

// Extend PodcastParams from Record<string, string | undefined>
interface PodcastParams extends Record<string, string | undefined> {
  id: string;
}

function Podcast() {
  const location = useLocation();
  
  const state = location.state as { 
    name: string,
    author: string,
    image: string,
    description: string
  };

  const { podcastId } = useParams<PodcastParams>();

  const [podcast, setPodcast] = useState<SinglePodcastType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSinglePodcast(podcastId as string);
        setPodcast(response);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, [podcastId]);

  return (
    <div className={styles['podcast-container']}>
      <div className={styles['podcast']}>
        <PodcastData props={state} />
      </div>
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
                      to={`/podcast/${podcastId}/episode/${item.trackId}`}>
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
  );
}

export default Podcast;
