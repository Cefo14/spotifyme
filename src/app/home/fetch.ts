import { cookies } from 'next/headers';

import { Cookies } from '@/enums/Cookies';
import { SpotifyApi } from '@/services/SpotifyApi';
import type { Artist } from '@/types/Spotify.dto';
import { InvalidSpotifyAccessTokenError } from '@/errors/InvalidSpotifyAccessTokenError';
import type { GenreCount, SpotifyTops } from './types';

const countGenres = (artists: Artist[]): GenreCount[] => {
  const genres = artists.flatMap((artist) => artist.genres);
  const genreCounter = new Map<string, GenreCount>();
  genres.forEach((genre) => {
    const defaultValue = { name: genre, count: 0 };
    const currentValue = genreCounter.get(genre) ?? defaultValue;
    const nextValue = {
      ...currentValue,
      count: currentValue.count + 1
    };
    genreCounter.set(genre, nextValue);
  });
  return Array
    .from(genreCounter.values())
    .sort((a, b) => b.count - a.count);
};

const fetchSpotifyTops = async (token: string): Promise<SpotifyTops> => {
  const spotifyApi = new SpotifyApi(token);

  const [
    topArtistsResponse,
    topTracksResponse,
    currentUserProfileResponse
  ] = await Promise.all([
    spotifyApi.fetchTopArtists(),
    spotifyApi.fetchTopTracks(),
    spotifyApi.fetchCurrentUserProfile()
  ]);

  const { items: artists } = topArtistsResponse;
  const { items: tracks } = topTracksResponse;

  const [firstArtist, secondArtist] = artists;
  const [firstTrack, secondTrack] = tracks;
  const [topGenre] = countGenres(topArtistsResponse.items);

  const recommendationsResponse = await spotifyApi.fetchRecommendations({
    seed_artists: [firstArtist.id, secondArtist.id],
    seed_tracks: [firstTrack.id, secondTrack.id],
    seed_genres: topGenre.name
  });

  return {
    currentUserProfile: currentUserProfileResponse,
    artists: topArtistsResponse.items,
    tracks: topTracksResponse.items,
    trackRecommendations: recommendationsResponse.tracks
  };
};

const getAccesToken = (): string => {
  const token = cookies().get(Cookies.access_token)?.value;
  if (!token) throw new InvalidSpotifyAccessTokenError();
  return token;
};

export const fetchInitialData = async () => {
  const token = getAccesToken();
  return fetchSpotifyTops(token);
};
