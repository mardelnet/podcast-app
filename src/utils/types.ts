/**
 * Interface representing the image of a podcast.
 */
interface PodcastImage {
  label: string;
}

/**
 * Interface representing a single podcast item.
 */
export interface PodcastType {
  'im:artist': { label: string };
  'im:image': PodcastImage[];
  contentAdvisoryRating: string;
  genres: { name: string; id: string }[];
  id: { attributes: { 'im:id': string } };
  kind: string;
  'im:name': { label: string };
  url: string;
  summary: { label: string };
}

/**
 * Interface representing a single podcast episode.
 */
export interface SinglePodcastType {
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
  episodeUrl: string;
  trackId: number;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
  description: string;
}
