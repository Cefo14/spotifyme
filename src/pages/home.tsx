/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Container, MaxWidthTypes } from '@/components/Container';

import { SpotifyApi } from '@/services/SpotifyApi';
import { Artist, CurrentUserProfileResponse, Track } from '@/types/Spotify.dto';

import styles from './home.module.css';

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

  return (
    <Container maxWidth={MaxWidthTypes.lg}>
      <h2>Top Artists</h2>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {
            tenArtists.map((artist) => (
              <li key={artist.id} className={styles.listItem}>
                <img
                  alt={artist.name}
                  src={artist.images[0].url}
                  width={75}
                  height={75}
                  className={styles.avatar}
                  loading="lazy"
                />
                <h3>{artist.name}</h3>
              </li>
            ))
          }
        </ul>
      </nav>
      <br />
      <article className={styles.card}>
        <img
          alt={currentUserProfile?.display_name?.[0]?.toUpperCase()}
          src={currentUserProfile?.images?.[0]?.url}
          width={75}
          height={75}
          className={styles.avatar}
          loading="lazy"
        />
        <h3>
          {currentUserProfile?.display_name}
        </h3>
      </article>
      <h2 className={styles.center}>Top Artists</h2>
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
              <h4 className={styles.center}>{`#${index + 1}`}</h4>
              <h3 className={styles.center}>
                {artist.name}
              </h3>
            </article>
          ))
        }
      </div>

      <h2 className={styles.center}>Top Tracks</h2>
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
              <h4 className={styles.center}>{`#${index + 1}`}</h4>
              <h3 className={styles.center}>
                {track.name}
              </h3>
            </article>
          ))
        }
      </div>
    </Container>
  );
};

export default Home;
