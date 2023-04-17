import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Main = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [artists, setArtists] = useState([]);

  // TODO this is a temporal feature
  const params = useMemo(() => (
    Object.fromEntries(searchParams.entries())
  ), [searchParams]);

  // TODO this is a temporal feature
  useEffect(() => {
    const currentHash = router.asPath.split('#')[1];
    if (currentHash) {
      router.push(`/?${currentHash}`);
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
      .then((data) => setArtists(data))
      .catch(console.log);
  }, [params]);

  return (
    <section>
      <Link
        href="/api/spotify/login"
      >
        Login with spotify
      </Link>
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

export default Main;
