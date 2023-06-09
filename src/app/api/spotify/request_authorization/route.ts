import { NextResponse } from 'next/server';
import crypto from 'crypto';

import { createURLWithQueryParams } from '@/utils/url';
import { Cookies } from '@/enums/Cookies';

export async function GET() {
  const verifier = crypto.randomBytes(32).toString('base64url');
  const state = crypto.randomBytes(14).toString('base64url');
  const verifierHashed = crypto.createHash('sha256').update(verifier).digest();

  const params = {
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: [
      'user-top-read'
    ],
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    state,
    code_challenge_method: 'S256',
    code_challenge: verifierHashed.toString('base64url'),
    show_dialog: 'true'
  };
  const BASE_URL = 'https://accounts.spotify.com/authorize';
  const url = createURLWithQueryParams(BASE_URL, params);

  const response = NextResponse.redirect(url);
  response.cookies.set(Cookies.verifier, verifier);
  return response;
}
