import type { FC } from 'react';
import type { NavProps } from './types';
import styles from './styles.module.css';

export const Nav: FC<NavProps> = ({
  title = '',
  items = []
}) => (
  <header className={styles.header}>
    <h3 className={styles.title}>
      { title }
    </h3>
    <nav className={styles.nav}>
      <input className={styles.menu} type="checkbox" id="menu" />
      <label className={styles.menuIcon} htmlFor="menu">
        <svg viewBox="0 0 100 80" width="25" height="25">
          <rect width="100" height="20" />
          <rect y="30" width="100" height="20" />
          <rect y="60" width="100" height="20" />
        </svg>
      </label>
      <ul className={styles.list}>
        {
          items.map((item) => (
            <li
              key={item.name}
              className={styles.listItem}
            >
              <a href={item.url}>
                { item.name }
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  </header>
);
