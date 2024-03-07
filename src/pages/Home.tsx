import React, { useState, useEffect } from 'react';
import { fetchTopPodcasts } from '../utils/fetchData';
import { PodcastType } from '../types/types';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import { useDispatch } from 'react-redux'
import { isLoading } from '../utils/loadingSlice'


function Home() {
  const [topPodcasts, setTopPodcasts] = useState<PodcastType[] | null>(null);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isLoading(true));
    const fetchData = async () => {
      try {
        const response = await fetchTopPodcasts();
        setTopPodcasts(response);
        dispatch(isLoading(false));
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    topPodcasts && (
      <div className={styles['podcast-container']}>
        {topPodcasts.map((podcast, index) => (
          <div className={styles['podcast-item']} key={index}>
            <Link 
              state={{
                name: podcast['im:name'].label,
                author: podcast['im:artist'].label,
                image: podcast['im:image'][2].label,
                description: podcast.summary.label
              }} 
              to={`/podcast/${podcast.id.attributes['im:id']}`}>
              <img 
                className={styles['podcast-item__image']} 
                src={podcast['im:image'][2].label} 
                alt={podcast['im:name'].label} />
              <h3>{podcast['im:name'].label}</h3>
              <p>Author: {podcast['im:artist'].label}</p>
            </Link>
          </div>
        ))}
      </div>
    )
  );
}

export default Home;
