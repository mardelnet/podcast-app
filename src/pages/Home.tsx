import React, { useState, useEffect } from 'react';
import { fetchTopPodcasts } from '../utils/fetchData';
import { PodcastType } from '../types/types';

function Home() {
  const [topPodcasts, setTopPodcasts] = useState<PodcastType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTopPodcasts();
        setTopPodcasts(response);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Top Podcasts</h2>
      {topPodcasts && topPodcasts.map((podcast, index) => (
        <div key={index}>
          <p><a href={`/podcast/${podcast.id}`}>{podcast.name}</a></p>
        </div>
      ))}
    </div>
  );
}

export default Home;
