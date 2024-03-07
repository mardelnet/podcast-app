import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchSinglePodcast } from '../utils/fetchData';
import { SinglePodcastType } from '../utils/types';
import styles from './styles/Podcast.module.scss';
import PodcastData from '../components/PodcastData';
import { useDispatch } from 'react-redux'
import { isLoading } from '../utils/loadingSlice'

// Extend PodcastParams from Record<string, string | undefined>
interface PodcastParams extends Record<string, string | undefined> {
  id: string;
}

function Podcast() {
  const { podcastId } = useParams<PodcastParams>();
  const dispatch = useDispatch()

  const [episodes, setPodcast] = useState<SinglePodcastType[] | null>(null);

  useEffect(() => {
    dispatch(isLoading(true));
    const fetchData = async () => {
      try {
        const response = await fetchSinglePodcast(podcastId as string);
        setPodcast(response);
        dispatch(isLoading(false));
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, [dispatch, podcastId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  }

  const formatTime = ( milliseconds:number ) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format minutes and seconds
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
 
  return (
    episodes && (
      <div className={styles['podcast-container']}>
      <div className={styles['podcast']}>
        {episodes && episodes[0] && (
          <PodcastData props={{
            name: episodes[0].collectionName,
            image: episodes[0].artworkUrl100,
            author: episodes[0].artistName,
            description: episodes[0].artistName,
          }} />
        )}
      </div>
      <div className={styles['episodes']}>
        <div className={styles['episodes__quantity']}>
          Episodes: {episodes?.length}
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
            {episodes && episodes.map((item: SinglePodcastType, index) => (
                <tr key={item.trackId} style={{ backgroundColor: index % 2 === 0 ? '#f6f6f6' : '#ffffff' }}>
                  <td>
                    <Link 
                      state={{episodeUrl: item.episodeUrl}} 
                      to={`/podcast/${podcastId}/episode/${item.trackId}`}>
                        {item.trackName}
                    </Link>
                  </td>
                  <td>{formatDate(item.releaseDate)}</td>
                  <td>{formatTime(item.trackTimeMillis)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
  );
}

export default Podcast;
