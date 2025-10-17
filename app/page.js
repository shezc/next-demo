import Link from 'next/link';
import Navigation from './components/Navigation';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Navigation />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Welcome to Next Demo</h1>
          <p className={styles.subtitle}>
            A modern web application built with Next.js featuring a Todo List and Blog
          </p>
        </div>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📝</div>
            <h2 className={styles.featureTitle}>Todo List</h2>
            <p className={styles.featureDescription}>
              Stay organized with our powerful todo list application. Add, complete, and manage your tasks efficiently.
            </p>
            <Link href="/todolist" className={styles.featureButton}>
              Try Todo List
            </Link>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📖</div>
            <h2 className={styles.featureTitle}>Blog</h2>
            <p className={styles.featureDescription}>
              Read our latest articles and tutorials about web development, technology, and more.
            </p>
            <Link href="/blog" className={styles.featureButton}>
              Read Blog
            </Link>
          </div>
        </div>

        <div className={styles.techStack}>
          <h3 className={styles.techTitle}>Built with modern technologies</h3>
          <div className={styles.techItems}>
            <span className={styles.techItem}>Next.js</span>
            <span className={styles.techItem}>React</span>
            <span className={styles.techItem}>CSS Modules</span>
            <span className={styles.techItem}>Responsive Design</span>
          </div>
        </div>
      </main>
    </div>
  );
}
