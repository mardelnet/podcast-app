import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Podcast from './pages/Podcast';
import Episode from './pages/Episode';
import NotFound from './pages/NotFound';
import Header from './components/Header';

/**
 * Main component representing the entire application.
 * Uses React Router to define routes and render corresponding components.
 * @returns JSX.Element representing the App component.
 */
function App(): JSX.Element {
  return (
    <Router>
      <div className='main-container'>
        {/* Render the Header component */}
        <Header />
        {/* Define routes using React Router */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Render Home component for root path */}
          <Route path="/podcast/:podcastId" element={<Podcast />} /> {/* Render Podcast component */}
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode />} /> {/* Render Episode component */}
          <Route path="*" element={<NotFound />} /> {/* Render NotFound component for any other path */}
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component
export default App;
