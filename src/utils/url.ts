import type { QueryParams } from '@/types/QueryParams';

export const createURLWithQueryParams = <U extends string, P extends QueryParams>
(url: U, params: P): string => {
  const currentURL = new URL(url);
  Object
    .entries(params)
    .forEach(([key, value]) => {
      currentURL.searchParams.set(key, value?.toString() ?? '');
    });
  return currentURL.toString();
};

export const getURLSearchParams = (url: string) => {
  const currentURL = new URL(url);
  const searchParamsEntries = currentURL.searchParams.entries();
  return Object.fromEntries(searchParamsEntries);
};
