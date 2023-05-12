import type { ElementType } from 'react';
import type { PolymorphicComponentPropsWithoutRef } from '@/types/PolymorphicComponent';

export type MaxWidth = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export interface ContainerProps {
  maxWidth?: MaxWidth;
  noPadding?: boolean;
}

export type ContainePolymorphicProps<E extends ElementType> = PolymorphicComponentPropsWithoutRef<
  E,
  ContainerProps
>;

export default ContainePolymorphicProps;
