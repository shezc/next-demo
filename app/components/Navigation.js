'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          Next Demo
        </Link>
        <div className={styles.navLinks}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/todolist" 
            className={`${styles.navLink} ${pathname === '/todolist' ? styles.active : ''}`}
          >
            TodoList
          </Link>
          <Link 
            href="/blog" 
            className={`${styles.navLink} ${pathname === '/blog' ? styles.active : ''}`}
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
