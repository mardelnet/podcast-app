import React, { useState, useEffect } from 'react';
import { fetchTopPodcasts } from '../utils/fetchData';
import { PodcastType } from '../types/types';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import { useDispatch } from 'react-redux';
import { isLoading } from '../utils/loadingSlice';
import SearchInput from '../components/SearchInput'; // Import the SearchInput component

function Home() {
  const [topPodcasts, setTopPodcasts] = useState<PodcastType[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useDispatch();

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

  const filteredPodcasts = topPodcasts?.filter(podcast =>
    podcast['im:name'].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    podcast['im:artist'].label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    topPodcasts && (
      <div>
        <SearchInput setSearchTerm={setSearchTerm} />
        <div className={styles['podcast-container']}>
          {filteredPodcasts && filteredPodcasts.map((podcast, index) => (
            <div className={styles['podcast-item']} key={index}>
              <Link
                state={{
                  name: podcast['im:name'].label,
                  author: podcast['im:artist'].label,
                  image: podcast['im:image'][2].label,
                  description: podcast.summary.label
                }}
                to={`/podcast/${podcast.id.attributes['im:id']}`}
              >
                <img
                  className={styles['podcast-item__image']}
                  src={podcast['im:image'][2].label}
                  alt={podcast['im:name'].label}
                />
                <h3>{podcast['im:name'].label}</h3>
                <p>Author: {podcast['im:artist'].label}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Home;
