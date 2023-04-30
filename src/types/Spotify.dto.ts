export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href?: string;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}

export interface ExternalIDS {
  isrc: string;
}

export interface Album {
  album_type: 'ALBUM' | 'COMPILATION' | 'SINGLE';
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: 'day';
  total_tracks: number;
  type: 'album';
  uri: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url?: string;
  track_number: number;
  type: 'track';
  uri: string;
}

export interface TopResPonse<I> {
  href: string;
  items: I[];
  limit: number;
  next: string;
  offset: number;
  previous?: string;
  total: number;
}

export type TopArtistsResponse = TopResPonse<Artist>;

export type TopTracksResponse = TopResPonse<Track>;

export interface CurrentUserProfileResponse {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}
