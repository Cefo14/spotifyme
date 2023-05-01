import { CurrentUserProfileResponse, TopArtistsResponse, TopTracksResponse } from './Spotify.dto';

export type TimeRange = 'long_term' | 'medium_term' | 'short_term';

export const TimeRanges: { [key in TimeRange]: key } = {
  long_term: 'long_term',
  medium_term: 'medium_term',
  short_term: 'short_term'
} as const;

export interface SpotifyService {
  fetchCurrentUserProfile: () => Promise<CurrentUserProfileResponse>;
  fetchTopArtists: (timeRange: TimeRange) => Promise<TopArtistsResponse>;
  fetchTopTracks: (timeRange: TimeRange) => Promise<TopTracksResponse>;
}
