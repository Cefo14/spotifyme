import { memo } from 'react';
import styles from './styles.module.css';

const Nav = ({
  title = '',
  routes = [
    {
      name: 'Top Artist',
      url: '#'
    },
    {
      name: 'Top Tracks',
      url: '#'
    }
  ]
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
          routes.map((route) => (
            <li
              key={route.name}
              className={styles.listItem}
            >
              <a href={route.url}>
                { route.name }
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  </header>
);

export default memo(Nav);
