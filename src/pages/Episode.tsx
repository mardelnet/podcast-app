import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Episode.module.scss';
import PodcastData from '../components/PodcastData';
import { SinglePodcastType } from '../types/types';
import { fetchSinglePodcast } from '../utils/fetchData';

// Extend EpisodeParams from Record<string, string | undefined>
interface EpisodeParams extends Record<string, string | undefined> {
  podcastId: string;
  episodeId: string;
}

function Episode() {
  const { podcastId, episodeId } = useParams<EpisodeParams>();

  const [episode, setEpisode] = useState<SinglePodcastType | null>(null);
  const [podcast, setPodcast] = useState<SinglePodcastType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSinglePodcast(podcastId as string);
        const currentEpisode = response.find((episode: { trackId: number; }) => episode.trackId === Number(episodeId));

        setPodcast(response[0])
        setEpisode(currentEpisode)
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, [episodeId, podcastId]);

  console.log(episode)

  return (
    <div className={styles['podcast-container']}>
      <div className={styles['podcast']}>
        {podcast && (
          <PodcastData props={{
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
  );
}

export default Episode;
