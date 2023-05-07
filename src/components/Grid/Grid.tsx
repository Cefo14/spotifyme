import type { CSSProperties, FC } from 'react';
import React, { useMemo } from 'react';
import clsx from 'clsx';

import type { GridProps } from './types';
import styles from './styles.module.css';

export const Grid: FC<GridProps> = ({
  gap = '1rem',
  gridAutoRows = '1fr',
  minTemplateColumn = '16rem',
  maxTemplateColumn = '1fr',
  style,
  className,
  children,
  ...props
}) => {
  const currentStyle = useMemo<CSSProperties>(() => ({
    ...(style ?? {}),
    gap,
    gridAutoRows,
    gridTemplateColumns: `repeat(auto-fill, minmax(${minTemplateColumn}, ${maxTemplateColumn}))`
  }), [gap, gridAutoRows, minTemplateColumn, maxTemplateColumn, style]);

  return (
    <ul
      className={clsx(styles.grid, className)}
      style={currentStyle}
      {...props}
    >
      { children }
    </ul>
  );
};
