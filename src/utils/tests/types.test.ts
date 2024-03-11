import { PodcastType, SinglePodcastType } from '../types';

describe('PodcastType interface', () => {
  it('should correctly type check podcast data', () => {
    const podcast: PodcastType = {
      'im:artist': { label: 'Artist' },
      'im:image': [{ label: 'Image' }],
      contentAdvisoryRating: 'Rating',
      genres: [{ name: 'Genre', id: '1' }],
      id: { attributes: { 'im:id': '1' } },
      kind: 'Kind',
      'im:name': { label: 'Name' },
      url: 'URL',
      summary: { label: 'Summary' }
    };

    expect(podcast).toBeDefined();
  });
});

describe('SinglePodcastType interface', () => {
  it('should correctly type check single podcast data', () => {
    const singlePodcast: SinglePodcastType = {
      trackName: 'Track Name',
      releaseDate: 'Release Date',
      trackTimeMillis: 10000,
      episodeUrl: 'Episode URL',
      trackId: 123,
      artistName: 'Artist Name',
      artworkUrl100: 'Artwork URL',
      collectionName: 'Collection Name',
      description: 'Description'
    };

    expect(singlePodcast).toBeDefined();
  });
});
