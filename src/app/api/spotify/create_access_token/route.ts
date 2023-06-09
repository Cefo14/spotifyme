import { type NextRequest, NextResponse } from 'next/server';
import { Cookies } from '@/enums/Cookies';
import { SpotifyApi } from '@/services/SpotifyApi';
import { CreateAccessTokenValidation } from '@/validations/CreateAccessTokenValidation';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const CODE_PARAM = 'code';
  const code = url.searchParams.get(CODE_PARAM);
  const verifier = request.cookies.get(Cookies.verifier)?.value;

  const validation = await CreateAccessTokenValidation.parseAsync({ code, verifier });

  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/home`);
  const ACCESS_TOKEN = request.cookies.get(Cookies.access_token)?.value;
  if (ACCESS_TOKEN) return response;

  const spotifyApi = new SpotifyApi();
  const spotifyApiResponse = await spotifyApi.createAccessToken({
    code: validation.code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    code_verifier: validation.verifier
  });

  response.cookies.set(Cookies.access_token, spotifyApiResponse.access_token);
  return response;
}
