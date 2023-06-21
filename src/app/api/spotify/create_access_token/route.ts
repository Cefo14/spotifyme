import { type NextRequest, NextResponse } from 'next/server';
import { Cookies } from '@/enums/Cookies';
import { SpotifyApi } from '@/services/SpotifyApi';
import { CreateAccessTokenValidation } from '@/validations/CreateAccessTokenValidation';
import { errorHandler } from '@/utils/errorHandler';

const getAcceptLanguage = (request: NextRequest) => {
  const DEFAULT_LOCALE = 'es';
  const acceptLanguage = request.headers.get('accept-language') ?? DEFAULT_LOCALE;
  const [language] = acceptLanguage.split(',');
  return language;
};

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const CODE_PARAM = 'code';
    const code = url.searchParams.get(CODE_PARAM);
    const verifier = request.cookies.get(Cookies.verifier)?.value;
    const validation = await CreateAccessTokenValidation.parseAsync({ code, verifier });

    const redirectToHome = NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/home`);
    const ACCESS_TOKEN = request.cookies.get(Cookies.access_token)?.value;
    if (ACCESS_TOKEN) return redirectToHome;

    const spotifyApi = new SpotifyApi();
    const spotifyApiResponse = await spotifyApi.createAccessToken({
      code: validation.code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
      client_id: process.env.SPOTIFY_CLIENT_ID as string,
      code_verifier: validation.verifier
    });

    redirectToHome.cookies.set(
      Cookies.access_token,
      spotifyApiResponse.access_token,
      { httpOnly: true, maxAge: spotifyApiResponse.expires_in }
    );

    redirectToHome.cookies.set(
      Cookies.locale,
      getAcceptLanguage(request),
      { httpOnly: true, maxAge: spotifyApiResponse.expires_in }
    );

    redirectToHome.cookies.delete(Cookies.verifier);

    return redirectToHome;
  }
  catch (error) {
    return errorHandler(error);
  }
}
