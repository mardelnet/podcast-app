import React, { useState, useEffect } from 'react';
import { fetchTopPodcasts } from '../utils/fetchData';
import { PodcastType } from '../types/types';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

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
    <div className='main-container'>
      {topPodcasts && (
        <div className={styles['podcast-container']}>
          {topPodcasts.map((podcast, index) => (
            <div className={styles['podcast-item']} key={index}>
              <Link 
                state={{
                  name: podcast.name,
                  author: podcast.artistName,
                  image: podcast.artworkUrl100,
                  description: podcast.description
                }} 
                to={`/podcast/${podcast.id}`}>
                <img className={styles['podcast-item__image']} src={podcast.artworkUrl100} alt={podcast.name} />
                <h3>{podcast.name}</h3>
                <p>Author: {podcast.artistName}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
