export interface PodcastType {
  artistName: string;
  artworkUrl100: string;
  contentAdvisoryRating: string;
  genres: { name: string; id: string }[];
  id: string;
  kind: string;
  name: string;
  url: string;
}

export interface SinglePodcastType {
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
  episodeUrl: string;
  trackId: number;
}