import Link from 'next/link';

const Login = () => (
  <section>
    <Link
      href="/api/spotify/login"
    >
      Login with spotify
    </Link>
  </section>
);

export default Login;
