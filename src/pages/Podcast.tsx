import React from 'react';
import { useParams } from 'react-router-dom';

// Extend PodcastParams from Record<string, string | undefined>
interface PodcastParams extends Record<string, string | undefined> {
  id: string;
}

function Podcast() {
  // Access the route parameter
  const { id } = useParams<PodcastParams>();

  return (
    <div>
      <p>Podcast ID: {id}</p>
    </div>
  );
}

export default Podcast;
