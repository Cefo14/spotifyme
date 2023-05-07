import type { CSSProperties, ComponentPropsWithoutRef } from 'react';

export interface GridProps extends ComponentPropsWithoutRef<'ul'> {
  gap?: CSSProperties['gap'];
  gridAutoRows?: CSSProperties['gridAutoRows'];
  minTemplateColumn?: string;
  maxTemplateColumn?: string;
}
