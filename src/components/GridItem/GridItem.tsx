import type { FC } from 'react';
import clsx from 'clsx';
import type { GridItemProps } from './types';

import styles from './styles.module.css';

export const GridItem: FC<GridItemProps> = ({
  className,
  children,
  ...props
}) => (
  <li
    className={clsx(styles.gridItem, className)}
    {...props}
  >
    { children }
  </li>
);
