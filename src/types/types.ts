export interface Podcast {
  artistName: string;
  artworkUrl100: string;
  contentAdvisoryRating: string;
  genres: { name: string; id: string }[];
  id: string;
  kind: string;
  name: string;
  url: string;
}