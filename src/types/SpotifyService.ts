import type {
  AccessTokenResponse,
  ArtistId,
  CurrentUserProfileResponse,
  Genre,
  RecommendationsResponse,
  TopArtistsResponse,
  TopTracksResponse,
  TrackId
} from './Spotify.dto';

export type TimeRange = 'long_term' | 'medium_term' | 'short_term';

export interface RecommendationParams {
  seed_artists?: ArtistId | ArtistId[];
  seed_genres?: Genre | Genre[];
  seed_tracks?: TrackId | TrackId[];
}

export interface CreateAccessTokenRequest {
  code: string;
  redirect_uri: string;
  client_id: string;
  code_verifier: string;
}

export interface SpotifyService {
  fetchCurrentUserProfile: () => Promise<CurrentUserProfileResponse>;
  fetchTopArtists: (timeRange: TimeRange) => Promise<TopArtistsResponse>;
  fetchTopTracks: (timeRange: TimeRange) => Promise<TopTracksResponse>;
  fetchRecommendations: (params: RecommendationParams) => Promise<RecommendationsResponse>;
  createAccessToken: (request: CreateAccessTokenRequest) => Promise<AccessTokenResponse>;
}
