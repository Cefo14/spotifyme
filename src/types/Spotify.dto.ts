export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum Type {
  Artist = 'artist'
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
  type: Type;
  uri: string;
}

export interface TopArtistsResponse {
  href: string;
  items: Artist[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface CurrentUserProfileResponse {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: any[];
  type: string;
  uri: string;
}
