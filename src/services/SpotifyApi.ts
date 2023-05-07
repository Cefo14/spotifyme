import type { SpotifyService, TimeRange, RecommendationParams } from '@/types/SpotifyService';
import type {
  CurrentUserProfileResponse,
  TopArtistsResponse,
  TopTracksResponse,
  RecommendationsResponse
} from '@/types/Spotify.dto';
import type { QueryParams } from '@/types/QueryParams';
import { TimeRanges } from '@/enums/SpotifyService';
import { createURLWithQueryParams } from '@/utils/url';

export class SpotifyApi implements SpotifyService {
  private readonly BASE_URL = 'https://api.spotify.com/v1';

  constructor(
    private readonly token: string
  ) {}

  private createConfig(config: RequestInit): RequestInit {
    return {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      cache: 'force-cache',
      ...config
    };
  }

  async fetchCurrentUserProfile(): Promise<CurrentUserProfileResponse> {
    const url = `${this.BASE_URL}/me`;
    const config = this.createConfig({ method: 'GET' });
    const response = await fetch(url, config);
    const data: CurrentUserProfileResponse = await response.json();
    return data;
  }

  async fetchTopArtists(timeRange: TimeRange = TimeRanges.short_term): Promise<TopArtistsResponse> {
    const url = `${this.BASE_URL}/me/top/artists`;
    const urlWithParams = createURLWithQueryParams(url, { time_range: timeRange });
    const config = this.createConfig({ method: 'GET' });
    const response = await fetch(urlWithParams, config);
    const data: TopArtistsResponse = await response.json();
    return data;
  }

  async fetchTopTracks(timeRange: TimeRange = TimeRanges.short_term): Promise<TopTracksResponse> {
    const url = `${this.BASE_URL}/me/top/tracks`;
    const urlWithParams = createURLWithQueryParams(url, { time_range: timeRange });
    const config = this.createConfig({ method: 'GET' });
    const response = await fetch(urlWithParams, config);
    const data: TopTracksResponse = await response.json();
    return data;
  }

  async fetchRecommendations(params: RecommendationParams): Promise<RecommendationsResponse> {
    const url = `${this.BASE_URL}/recommendations`;
    const urlWithParams = createURLWithQueryParams(url, params as QueryParams);
    const config = this.createConfig({ method: 'GET' });
    const response = await fetch(urlWithParams, config);
    const data: RecommendationsResponse = await response.json();
    return data;
  }
}

export default SpotifyApi;
