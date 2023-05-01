import type { MaxWidth } from './types';

export const MaxWidths: { [key in MaxWidth]: key } = {
  xl: 'xl',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs'
} as const;
