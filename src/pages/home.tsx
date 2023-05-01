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

const Home = () => {
  const router = useRouter();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<CurrentUserProfileResponse>();

  // TODO this is a temporal feature
  const spotifyToken = useMemo(() => {
    const [, params] = router.asPath.split('#');
    const searchParams = new URLSearchParams(params);
    return searchParams.get('access_token');
  }, [router]);

  const genresCounter = useMemo(() => {
    const artisGenres = artists.map((artist) => artist.genres).flat();
    const counter = artisGenres.reduce((acc, genre) => {
      const currentValue = acc.get(genre) ?? 0;
      acc.set(genre, currentValue + 1);
      return acc;
    }, new Map<string, number>());

    return Object.fromEntries(counter.entries());
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
  }, [router, spotifyToken]);

  const tenArtists = artists;
  const tenTracks = tracks;
  console.log(genresCounter);

  return (
    <>
      <Nav title={currentUserProfile?.display_name} items={NAV_ITEMS} />
      <Container maxWidth={MaxWidths.lg} className={styles.container}>
        <h2 className={styles.textCenter}>Top Artists</h2>
        <div className={styles.cardContainer}>
          {
            tenArtists.map((artist, index) => (
              <article key={artist.id} className={styles.card}>
                <img
                  alt={artist.name}
                  src={artist.images[0].url}
                  width={250}
                  height={250}
                  className={styles.cardImage}
                  loading="lazy"
                />
                <h4 className={styles.textCenter}>{`#${index + 1}`}</h4>
                <h3 className={styles.textCenter}>
                  {artist.name}
                </h3>
              </article>
            ))
          }
        </div>

        <h2 className={styles.textCenter}>Top Tracks</h2>
        <div className={styles.cardContainer}>
          {
            tenTracks.map((track, index) => (
              <article key={track.id} className={styles.card}>
                <img
                  alt={track.name}
                  src={track.album.images[0].url}
                  width={250}
                  height={250}
                  className={styles.cardImage}
                  loading="lazy"
                />
                <h4 className={styles.textCenter}>{`#${index + 1}`}</h4>
                <h3 className={styles.textCenter}>
                  {track.name}
                </h3>
              </article>
            ))
          }
        </div>
      </Container>
    </>
  );
};

export default Home;
