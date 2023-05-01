import { ElementType, memo } from 'react';
import clsx from 'clsx';

import { ContainerPropTypes, MaxWidths, MaxWidth } from './types';
import styles from './styles.module.css';

export const MAX_WIDTH_CLASS_NAMES: { [key in MaxWidth]: string } = {
  xl: styles.maxWidth_xl,
  lg: styles.maxWidth_lg,
  md: styles.maxWidth_md,
  sm: styles.maxWidth_sm,
  xs: styles.maxWidth_xs
};

export const DEFAULT_MAX_WIDTH: MaxWidth = MaxWidths.sm;

export const DEFAULT_COMPONENT = 'div' as const;

export const NO_PADDING_CLASS_NAME = styles.noPadding;

export const Container = <C extends ElementType>({
  component,
  className,
  children,
  maxWidth = DEFAULT_MAX_WIDTH,
  noPadding = false,
  ...props
}: ContainerPropTypes<C>) => {
  const Component = component ?? DEFAULT_COMPONENT;

  return (
    <Component
      {...props}
      className={clsx(
        styles.container,
        MAX_WIDTH_CLASS_NAMES[maxWidth],
        { [NO_PADDING_CLASS_NAME]: noPadding },
        className
      )}
    >
      {children}
    </Component>
  );
};

export default memo(Container);
