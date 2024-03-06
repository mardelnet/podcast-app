import React from 'react';
import { useParams } from 'react-router-dom';

// Extend EpisodeParams from Record<string, string | undefined>
interface EpisodeParams extends Record<string, string | undefined> {
  podcastId: string;
  episodeId: string;
}

function Episode() {
  // Access the route parameter
  const { podcastId, episodeId } = useParams<EpisodeParams>();

  return (
    <div>
      <p>Podcast ID: {podcastId}</p>
      <p>Episode ID: {episodeId}</p>
    </div>
  );
}

export default Episode;
