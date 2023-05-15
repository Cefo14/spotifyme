import type { Artist, CurrentUserProfileResponse, Track } from '@/types/Spotify.dto';

export interface GenreCount {
  name: string;
  count: number;
}

export interface HomeProps {
  searchParams: {
    code: string;
  };
}

export interface SpotifyTops {
  currentUserProfile: CurrentUserProfileResponse;
  artists: Artist[];
  tracks: Track[];
  trackRecommendations: Track[];
}
