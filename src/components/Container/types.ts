import { ElementType } from 'react';
import { PolymorphicComponentPropsWithoutRef } from '@/types/PolymorphicComponent';

export type MaxWidthType = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

export const MaxWidthTypes: { [key in MaxWidthType]: key } = {
  xl: 'xl',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs'
} as const;

export interface ContainerProps {
  maxWidth?: MaxWidthType;
  noPadding?: boolean;
}

export type ContainerPropTypes<Component extends ElementType> = PolymorphicComponentPropsWithoutRef<
  Component,
  ContainerProps
>;

export default ContainerPropTypes;
