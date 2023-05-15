/* eslint-disable @next/next/no-img-element */
import { Nav } from '@/components/Nav';
import { Container, MaxWidths } from '@/components/Container';
import { Grid } from '@/components/Grid';
import { GridItem } from '@/components/GridItem';

import styles from './home.module.css';
import { fetchInitialData } from './fetch';
import type { HomeProps } from './types';

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

const Home = async ({ searchParams }: HomeProps) => {
  const {
    currentUserProfile,
    artists,
    tracks,
    trackRecommendations
  } = await fetchInitialData(searchParams.code);

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
