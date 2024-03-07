interface PodcastImage {
  label: string;
}

export interface PodcastType {
  'im:artist': { label: string };
  'im:image': PodcastImage[];
  contentAdvisoryRating: string;
  genres: { name: string; id: string }[];
  id: { attributes: { 'im:id': string } };
  kind: string;
  'im:name': { label: string };
  url: string;
  description: string;
}

export interface SinglePodcastType {
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
  episodeUrl: string;
  trackId: number;
}