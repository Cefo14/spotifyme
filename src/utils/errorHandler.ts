import { NextResponse } from 'next/server';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';
import { ZodError } from 'zod';

import { HttpClientError } from '@/errors/HttpClientError';

interface JSendError {
  status: 'fail' | 'error';
  message: string;
  data: unknown;
}

export const errorHandler = (error: unknown) => {
  const message = error instanceof Error ? error.message : error?.toString() ?? 'Unknown Error';
  const response: JSendError = {
    status: 'fail',
    message,
    data: null
  };
  let httpStatus: number = INTERNAL_SERVER_ERROR;

  if (error instanceof ZodError) {
    response.message = 'Bad Request';
    response.data = error.issues;
    httpStatus = BAD_REQUEST;
  }

  else if (error instanceof HttpClientError) {
    httpStatus = BAD_REQUEST;
  }

  else {
    response.status = 'error';
  }
  return NextResponse.json(response, { status: httpStatus });
};
