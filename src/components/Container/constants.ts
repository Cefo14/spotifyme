import type { MaxWidth } from './types';
import { MaxWidths } from './enums';
import styles from './styles.module.css';

export const MAX_WIDTH_CLASS_NAMES: { [key in MaxWidth]: string } = {
  xl: styles.maxWidth_xl,
  lg: styles.maxWidth_lg,
  md: styles.maxWidth_md,
  sm: styles.maxWidth_sm,
  xs: styles.maxWidth_xs
} as const;

export const DEFAULT_MAX_WIDTH: MaxWidth = MaxWidths.sm;

export const DEFAULT_COMPONENT = 'div' as const;

export const NO_PADDING_CLASS_NAME = styles.noPadding;
