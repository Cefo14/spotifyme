import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Artist, ArtistResponse } from '@/types/Artist';

const Home = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [artists, setArtists] = useState<Artist[]>([]);

  // TODO this is a temporal feature
  const params = useMemo(() => (
    Object.fromEntries(searchParams.entries())
  ), [searchParams]);

  // TODO this is a temporal feature
  useEffect(() => {
    const currentHash = router.asPath.split('#')[1];
    if (currentHash) {
      router.push(`/home?${currentHash}`);
    }
  }, [router]);

  // TODO this is a temporal feature
  useEffect(() => {
    if (!params?.access_token) return;
    fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${params.access_token}`
      },
      cache: 'force-cache'
    })
      .then((res) => res.json())
      .then((data: ArtistResponse) => setArtists(data.items))
      .catch(console.error);
  }, [params]);

  return (
    <section>
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
