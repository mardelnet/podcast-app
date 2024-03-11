import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PodcastData from '../PodcastData';

const mockPodcast = {
  id: 1,
  image: 'image.jpg',
  name: 'Podcast Name',
  author: 'Podcast Author',
  description: 'Podcast Description'
};

describe('PodcastData component', () => {
  it('renders podcast data correctly', () => {
    render(
      <MemoryRouter>
        <PodcastData props={mockPodcast} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(mockPodcast.name)).toBeInTheDocument();
    expect(screen.getByText(`by ${mockPodcast.author}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockPodcast.name)).toBeInTheDocument();
  });

  it('renders description if available', () => {
    const podcastWithDescription = { ...mockPodcast, description: 'Test Description' };

    render(
      <MemoryRouter>
        <PodcastData props={podcastWithDescription} />
      </MemoryRouter>
    );

    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText(podcastWithDescription.description)).toBeInTheDocument();
  });

  it('does not render description if not available', () => {
    const podcastWithoutDescription = { ...mockPodcast, description: '' };

    render(
      <MemoryRouter>
        <PodcastData props={podcastWithoutDescription} />
      </MemoryRouter>
    );

    expect(screen.queryByText('Description:')).not.toBeInTheDocument();
  });
});
