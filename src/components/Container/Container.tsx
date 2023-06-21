import type { ElementType } from 'react';
import clsx from 'clsx';

import type { ContainePolymorphicProps } from './types';
import {
  DEFAULT_MAX_WIDTH,
  DEFAULT_COMPONENT,
  MAX_WIDTH_CLASS_NAMES,
  NO_PADDING_CLASS_NAME
} from './constants';
import styles from './styles.module.css';

export const Container = <C extends ElementType = typeof DEFAULT_COMPONENT >({
  component,
  className,
  children,
  maxWidth = DEFAULT_MAX_WIDTH,
  noPadding = false,
  ...props
}: ContainePolymorphicProps<C>) => {
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
