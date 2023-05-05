import type { QueryParams, QueryParamValue } from '@/types/QueryParams';

import type {
  CurrentUserProfileResponse,
  RecommendationsResponse,
  TopArtistsResponse,
  TopTracksResponse
} from './Spotify.dto';

export type TimeRange = 'long_term' | 'medium_term' | 'short_term';

export interface RecommendationParams {
  seed_artists?: QueryParamValue;
  seed_genres?: string[];
  seed_tracks?: QueryParamValue;
}

export interface SpotifyService {
  fetchCurrentUserProfile: () => Promise<CurrentUserProfileResponse>;
  fetchTopArtists: (timeRange: TimeRange) => Promise<TopArtistsResponse>;
  fetchTopTracks: (timeRange: TimeRange) => Promise<TopTracksResponse>;
  fetchRecommendations: (params: QueryParams) => Promise<RecommendationsResponse>;
}
