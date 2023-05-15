import { cookies } from 'next/headers';

import { Cookies } from '@/enums/Cookies';
import { SpotifyApi } from '@/services/SpotifyApi';
import type { Artist } from '@/types/Spotify.dto';
import { VerifierCodeMissingError } from '@/errors/VerifierCodeMissingError';
import type { GenreCount, SpotifyTops } from './types';

const createGenreCounts = (artists: Artist[]): GenreCount[] => {
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

const fetchVerifierCookie = (): string => {
  const verifierCookie = cookies().get(Cookies.verifier);
  if (!verifierCookie) throw new VerifierCodeMissingError();
  return verifierCookie.value;
};

const fetchSpotifyAccessToken = async (code: string, verifier: string): Promise<string> => {
  const spotifyApi = new SpotifyApi();

  const response = await spotifyApi.createAccessToken({
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    code_verifier: verifier
  });

  const { access_token: accessToken } = response;
  return accessToken;
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
  const [topGenre] = createGenreCounts(topArtistsResponse.items);

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

export const fetchInitialData = async (code: string) => {
  const verifier = fetchVerifierCookie();
  const accessToken = await fetchSpotifyAccessToken(code, verifier);
  return fetchSpotifyTops(accessToken);
};
