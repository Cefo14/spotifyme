import { CurrentUserProfileResponse, TopArtistsResponse } from '@/types/Spotify.dto';
import { SpotifyService, TimeRange } from '@/types/SpotifyService';

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

  async fetchTopArtists(timeRange: TimeRange = TimeRange.longTerm): Promise<TopArtistsResponse> {
    const url = `${this.BASE_URL}/me/top/artists?time_range=${timeRange}`;
    const config = this.createConfig({ method: 'GET' });
    const response = await fetch(url, config);
    const data: TopArtistsResponse = await response.json();
    return data;
  }
}

export default SpotifyApi;