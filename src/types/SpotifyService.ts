import { CurrentUserProfileResponse, TopArtistsResponse, TopTracksResponse } from './Spotify.dto';

export enum TimeRange {
  longTerm = 'long_term',
  mediumTerm = 'medium_term',
  shortTerm = 'short_term'
}

export interface SpotifyService {
  fetchCurrentUserProfile: () => Promise<CurrentUserProfileResponse>;
  fetchTopArtists: (timeRange: TimeRange) => Promise<TopArtistsResponse>;
  fetchTopTracks: (timeRange: TimeRange) => Promise<TopTracksResponse>;
}
