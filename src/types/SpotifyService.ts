import type { CurrentUserProfileResponse, TopArtistsResponse, TopTracksResponse } from './Spotify.dto';

export type TimeRange = 'long_term' | 'medium_term' | 'short_term';

export interface SpotifyService {
  fetchCurrentUserProfile: () => Promise<CurrentUserProfileResponse>;
  fetchTopArtists: (timeRange: TimeRange) => Promise<TopArtistsResponse>;
  fetchTopTracks: (timeRange: TimeRange) => Promise<TopTracksResponse>;
}
