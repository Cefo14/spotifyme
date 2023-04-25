import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

import { createURLWithQueryParams } from '../../../utils/url';

const handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const state = crypto.randomBytes(16);
  const params = {
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: [
      'user-top-read',
      'user-read-currently-playing',
      'user-read-playback-state'
    ],
    response_type: 'token',
    show_dialog: 'true',
    state: state.toString('hex')
  };

  const MOVED_PERMANENTLY_HTTP_STATUS_CODE = 301;
  const BASE_URL = 'https://accounts.spotify.com/authorize';
  const url = createURLWithQueryParams(BASE_URL, params);
  res.redirect(MOVED_PERMANENTLY_HTTP_STATUS_CODE, url);
};

export default handler;
