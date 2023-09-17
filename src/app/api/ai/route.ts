import { type NextRequest, NextResponse } from 'next/server';

import Bard from 'bard-ai';
import removeMd from 'remove-markdown';
import { normalizeText, capitalizeFirstLetter } from 'normalize-text';

import type { Artist } from '@/types/Spotify.dto';
import { errorHandler } from '@/utils/errorHandler';
import { Cookies } from '@/enums/Cookies';

const sanatizeAiResponse = (response: string) => {
  let sanatizedResponse = normalizeText(response);
  sanatizedResponse = capitalizeFirstLetter(sanatizedResponse);
  sanatizedResponse = removeMd(sanatizedResponse);
  return sanatizedResponse
    .replace(/¿[^?]+?\?/g, '') // * remove questions
    .replace(/\([^)]+\)/g, '') // * remove suggestions
    .trim(); // * remove possible whitespaces
};

export async function POST(request: NextRequest) {
  try {
    const USER_DESCRIPTION = request.cookies.get(Cookies.user_description)?.value;
    if (USER_DESCRIPTION) return NextResponse.json(USER_DESCRIPTION);

    const bard = new Bard(process.env.BARD_COOKIE as string);
    const artists = (await request.json() as Artist[]) || [];
    const artistsNames = artists.map((artist) => artist.name).join(' ');
    const prompt = [
      `Describe mi personalidad conforme a mis siguientes grupos de música mas escuchados: ${artistsNames}.`,
      'Tu respuesta debe tener el siguiente formato: Eres [descripción]. También debe tener una longitud no mayor a 512 caracteres.'
    ].join('\n');

    const bardResponse = await bard.ask(prompt);
    const sanatizedResponse = sanatizeAiResponse(bardResponse.toString());
    // Todo remove log
    console.log(prompt, bardResponse);

    const response = NextResponse.json(sanatizedResponse);
    response.cookies.set(
      Cookies.user_description,
      sanatizedResponse,
      { httpOnly: true, maxAge: Date.now() + 60 * 60 * 1000 }
    );
    return response;
  }
  catch (error) {
    errorHandler(error);
  }
}
