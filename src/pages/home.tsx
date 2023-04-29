/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Artist } from '@/types/Spotify.dto';
import { SpotifyApi } from '@/services/SpotifyApi';

import styles from './home.module.css';

const Home = () => {
  const router = useRouter();
  const [artists, setArtists] = useState<Artist[]>([]);

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
      spotifyApi.fetchCurrentUserProfile()
    ])
      .then(([topArtists, currentUserProfile]) => {
        setArtists(topArtists.items);
        console.log(topArtists, currentUserProfile);
      })
      .catch(console.error);
  }, [spotifyToken]);

  return (
    <section className={styles.container}>
      <article className={styles.cardContainer}>
        {
          artists.map((artist) => (
            <div key={artist.id} className={styles.card}>
              <img
                alt={artist.name}
                src={artist.images[0].url}
                width={150}
                height={150}
                className={styles.cardImage}
                loading="lazy"
              />
              <h3>{ artist.name }</h3>
            </div>
          ))
        }
      </article>
      <pre>
        <code>
          {
            JSON.stringify(
              artists,
              null,
              2
            )
          }
        </code>
      </pre>
    </section>
  );
};

export default Home;
