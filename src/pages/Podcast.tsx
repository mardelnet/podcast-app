import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchSinglePodcast } from '../utils/fetchData';
import { SinglePodcastType } from '../utils/types';
import styles from './styles/Podcast.module.scss';
import PodcastData from '../components/PodcastData';
import { useDispatch } from 'react-redux';
import { isLoading } from '../utils/loadingSlice';

// Extend PodcastParams from Record<string, string | undefined>
interface PodcastParams extends Record<string, string | undefined> {
  id: string;
}

/**
 * Functional component representing a podcast page.
 * Fetches and displays podcast data and its episodes.
 * @returns JSX.Element representing the Podcast component.
 */
function Podcast(): JSX.Element {
  const { podcastId } = useParams<PodcastParams>();
  const dispatch = useDispatch();

  const [episodes, setPodcast] = useState<SinglePodcastType[] | null>(null);

  useEffect(() => {
    dispatch(isLoading(true));
    const fetchData = async () => {
      try {
        const response = await fetchSinglePodcast(podcastId as string);
        setPodcast(response);
        dispatch(isLoading(false));
      } catch (error: any) {
        console.error('Error fetching podcast data:', error.message);
      }
    };
    fetchData();
  }, [dispatch, podcastId]);

  /**
   * Formats a date string to a human-readable format (dd/mm/yyyy).
   * @param dateString - The date string to format.
   * @returns The formatted date string.
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  }

  /**
   * Formats milliseconds to a human-readable time format (hh:mm:ss or mm:ss).
   * @param milliseconds - The duration in milliseconds.
   * @returns The formatted time string.
   */
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format hours, minutes, and seconds
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Construct the formatted time string
    if (hours > 0) {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  }
 
  return (
    <div className={styles['podcast-container']}>
      <div className={styles['podcast']}>
        {episodes && episodes[0] && (
          <PodcastData props={{
            id: episodes[0].trackId,
            name: episodes[0].collectionName,
            image: episodes[0].artworkUrl100,
            author: episodes[0].artistName,
            description: episodes[0].artistName,
          }} />
        )}
      </div>
      {episodes && (
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
                // Skip the first element since it is not an episode of the podcast.
                index > 0 &&
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
      )}
    </div>
  );
}

export default Podcast;
