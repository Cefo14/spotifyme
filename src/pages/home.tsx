/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Container, MaxWidths } from '@/components/Container';
import { Nav } from '@/components/Nav';

import { SpotifyApi } from '@/services/SpotifyApi';
import type { Artist, CurrentUserProfileResponse, Track } from '@/types/Spotify.dto';

import styles from './home.module.css';

const NAV_ITEMS = [
  {
    name: 'Top Artist',
    url: '#'
  },
  {
    name: 'Top Tracks',
    url: '#'
  }
];

interface GenreCount {
  name: string; count: number;
}

const Home = () => {
  const router = useRouter();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackRecommendations, setTrackRecommendations] = useState<Track[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<CurrentUserProfileResponse>();

  // TODO this is a temporal feature
  const spotifyToken = useMemo(() => {
    const [, params] = router.asPath.split('#');
    const searchParams = new URLSearchParams(params);
    return searchParams.get('access_token');
  }, [router]);

  const genreCounts = useMemo<GenreCount[]>(() => {
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
  }, [artists]);

  // TODO this is a temporal feature
  useEffect(() => {
    if (!spotifyToken) return;
    const spotifyApi = new SpotifyApi(spotifyToken);

    Promise.all([
      spotifyApi.fetchTopArtists(),
      spotifyApi.fetchTopTracks(),
      spotifyApi.fetchCurrentUserProfile()
    ])
      .then(([topArtistsResponse, topTracksResponse, currentUserProfileResponse]) => {
        setArtists(topArtistsResponse.items);
        setTracks(topTracksResponse.items);
        setCurrentUserProfile(currentUserProfileResponse);
        console.log(topArtistsResponse, topTracksResponse, currentUserProfileResponse);
      })
      .catch((error) => {
        console.log(error);
        router.replace('/');
      });

    spotifyApi.fetchRecommendations({ seed_genres: ['rock'] }).then(console.log);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyToken]);

  useEffect(() => {
    if (genreCounts.length === 0 || !spotifyToken) return;
    const spotifyApi = new SpotifyApi(spotifyToken);
    const seedArtists = artists.slice(0, 2).map((artist) => artist.id);
    const seedTracks = artists.slice(0, 2).map((track) => track.id);
    const seedGenres = genreCounts.slice(0, 1).map((genreCount) => genreCount.name);
    spotifyApi.fetchRecommendations({
      seed_artists: seedArtists,
      seed_tracks: seedTracks,
      seed_genres: seedGenres
    }).then((recommendations) => {
      setTrackRecommendations(recommendations.tracks);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyToken, genreCounts]);

  console.log({ genreCounts });

  return (
    <main>
      <Nav title={currentUserProfile?.display_name} items={NAV_ITEMS} />
      <Container maxWidth={MaxWidths.lg} className={styles.container}>
        <h2 className={styles.textCenter}>Top Artists</h2>
        <ul className={styles.cardList}>
          {
            artists.map((artist, index) => (
              <li key={artist.id} className={styles.cardListItem}>
                <article className={styles.card}>
                  <img
                    alt={artist.name}
                    src={artist.images[0].url}
                    width={250}
                    height={250}
                    className={styles.cardImage}
                  />
                  <h3 className={styles.textCenter}>
                    <div>{`#${index + 1}`}</div>
                    {' '}
                    <div>{artist.name}</div>
                  </h3>
                </article>
              </li>
            ))
          }
        </ul>

        <h2 className={styles.textCenter}>Top Tracks</h2>
        <ul className={styles.cardList}>
          {
            tracks.map((track, index) => (
              <li key={track.id} className={styles.cardListItem}>
                <article className={styles.card}>
                  <img
                    alt={track.name}
                    src={track.album.images[0].url}
                    width={250}
                    height={250}
                    className={styles.cardImage}
                  />
                  <h3 className={styles.textCenter}>
                    <div>{`#${index + 1}`}</div>
                    <div>{track.name}</div>
                  </h3>
                </article>
              </li>
            ))
          }
        </ul>

        <h2 className={styles.textCenter}>Recommendation</h2>
        <ul className={styles.cardList}>
          {
            trackRecommendations.map((trackRecommendation) => (
              <li key={trackRecommendation.id} className={styles.cardListItem}>
                <iframe
                  title={trackRecommendation.name}
                  src={`https://open.spotify.com/embed/track/${trackRecommendation.id}`}
                  allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  width="100%"
                  height={16 * 30}
                  frameBorder={0}
                />
              </li>
            ))
          }
        </ul>
      </Container>
    </main>
  );
};

export default Home;
