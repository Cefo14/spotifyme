import { redirect } from 'next/navigation';
import crypto from 'crypto';

import { createURLWithQueryParams } from '@/utils/url';

export async function GET() {
  const state = crypto.randomBytes(16);
  const params = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: [
      'user-top-read'
    ],
    response_type: 'token',
    show_dialog: 'true',
    state: state.toString('hex')
  };

  const BASE_URL = 'https://accounts.spotify.com/authorize';
  const url = createURLWithQueryParams(BASE_URL, params);
  redirect(url);
}
