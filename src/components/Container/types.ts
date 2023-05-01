import { ElementType } from 'react';
import { PolymorphicComponentPropsWithoutRef } from '@/types/PolymorphicComponent';

export type MaxWidth = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export const MaxWidths: { [key in MaxWidth]: key } = {
  xl: 'xl',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs'
} as const;

export interface ContainerProps {
  maxWidth?: MaxWidth;
  noPadding?: boolean;
}

export type ContainerPropTypes<Component extends ElementType> = PolymorphicComponentPropsWithoutRef<
  Component,
  ContainerProps
>;

export default ContainerPropTypes;
