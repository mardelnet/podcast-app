import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchSinglePodcast } from '../utils/fetchData';
import { SinglePodcastType } from '../types/types';
import AudioPlayer from '../components/AudioPlayer';

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
    <div>
      <h2>List of Tracks</h2>
      {podcast && podcast.map((item: SinglePodcastType) => (
        <p key={item.trackId}>
          <Link to={`/podcast/${id}/episode/${item.trackId}`}>{item.trackName}</Link>
        </p>
      ))}
    </div>
  );
}

export default Podcast;
