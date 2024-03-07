import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Podcast from './pages/Podcast';
import Episode from './pages/Episode';
import NotFound from './pages/NotFound';
import Header from './components/Header';

// Define the App component
function App() {
  return (
    <Router>
      <div className='main-container'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<Podcast />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component
export default App;
