/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Container, MaxWidths } from '@/components/Container';
import { Nav } from '@/components/Nav';
import { Grid } from '@/components/Grid';
import { GridItem } from '@/components/GridItem';

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
      })
      .catch((error) => {
        console.log(error);
        router.replace('/');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyToken]);

  useEffect(() => {
    if (genreCounts.length === 0 || !spotifyToken) return;
    const spotifyApi = new SpotifyApi(spotifyToken);
    const [firstArtist, secondArtist] = artists;
    const [firstTrack, secondTrack] = tracks;
    const [topGenre] = genreCounts;
    spotifyApi
      .fetchRecommendations({
        seed_artists: [firstArtist.id, secondArtist.id],
        seed_tracks: [firstTrack.id, secondTrack.id],
        seed_genres: topGenre.name
      })
      .then((recommendations) => {
        setTrackRecommendations(recommendations.tracks);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyToken, genreCounts]);

  return (
    <main>
      <Nav title={currentUserProfile?.display_name} items={NAV_ITEMS} />
      <Container maxWidth={MaxWidths.lg} className={styles.container}>
        <h2 className={styles.textCenter}>Top Artists</h2>
        <Grid>
          {
            artists.map((artist, index) => (
              <GridItem key={artist.id}>
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
              </GridItem>
            ))
          }
        </Grid>

        <h2 className={styles.textCenter}>Top Tracks</h2>
        <Grid>
          {
            tracks.map((track, index) => (
              <GridItem key={track.id}>
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
              </GridItem>
            ))
          }
        </Grid>

        <h2 className={styles.textCenter}>Recommendation</h2>
        <Grid gridAutoRows="22rem">
          {
            trackRecommendations.map((trackRecommendation) => (
              <GridItem key={trackRecommendation.id}>
                <iframe
                  title={trackRecommendation.name}
                  src={`https://open.spotify.com/embed/track/${trackRecommendation.id}`}
                  allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  width="100%"
                  height={480}
                />
              </GridItem>
            ))
          }
        </Grid>
      </Container>
    </main>
  );
};

export default Home;
