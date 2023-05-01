import type { TimeRange } from '@/types/SpotifyService';

export const TimeRanges: { [key in TimeRange]: key } = {
  long_term: 'long_term',
  medium_term: 'medium_term',
  short_term: 'short_term'
} as const;
