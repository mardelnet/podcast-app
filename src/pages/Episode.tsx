import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles/Episode.module.scss';
import PodcastData from '../components/PodcastData';
import { SinglePodcastType } from '../utils/types';
import { fetchSinglePodcast } from '../utils/fetchData';
import { useDispatch } from 'react-redux'
import { isLoading } from '../utils/loadingSlice'

// Extend EpisodeParams from Record<string, string | undefined>
interface EpisodeParams extends Record<string, string | undefined> {
  podcastId: string;
  episodeId: string;
}

function Episode() {
  const { podcastId, episodeId } = useParams<EpisodeParams>();
  const dispatch = useDispatch()
  
  const [episode, setEpisode] = useState<SinglePodcastType | null>(null);
  const [podcast, setPodcast] = useState<SinglePodcastType | null>(null);

  useEffect(() => {
    dispatch(isLoading(true));
    const fetchData = async () => {
      try {
        const response = await fetchSinglePodcast(podcastId as string);
        const currentEpisode = response.find((episode: { trackId: number; }) => episode.trackId === Number(episodeId));

        setPodcast(response[0])
        setEpisode(currentEpisode)
        dispatch(isLoading(false));
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, [dispatch, episodeId, podcastId]);

  return (
    podcast && episode && (
      <div className={styles['podcast-container']}>
      <div className={styles['podcast']}>
        {podcast && (
          <PodcastData props={{
            id: podcast.trackId,
            name: podcast.collectionName,
            image: podcast.artworkUrl100,
            author: podcast.artistName,
            description: podcast.artistName,
          }} />
        )}
      </div>
      <div className={styles['episode']}>
        <div className={styles['episode__data']}>
          <h1>{episode?.trackName}</h1>
          <p>{episode?.description}</p>
          <audio controls>
            <source src={episode?.episodeUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
    )
  );
}

export default Episode;
