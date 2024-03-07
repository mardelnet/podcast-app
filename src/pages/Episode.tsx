import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Extend EpisodeParams from Record<string, string | undefined>
interface EpisodeParams extends Record<string, string | undefined> {
  podcastId: string;
  episodeId: string;
}

function Episode() {
  const location = useLocation();
  
  const { podcastId, episodeId } = useParams<EpisodeParams>();
  const state = location.state as { episodeUrl: string };

  return (
    <div>
      <p>Podcast ID: {podcastId}</p>
      <p>Episode ID: {episodeId}</p>

      <audio controls>
        <source src={state.episodeUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Episode;
