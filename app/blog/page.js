'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'Web Development', 'Tutorial', 'Technology'];

  // 获取博客文章数据
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        const result = await response.json();
        
        if (result.success) {
          setPosts(result.data);
        } else {
          setError(result.error || 'Failed to fetch posts');
        }
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 搜索和过滤功能
  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }
        if (searchTerm) {
          params.append('search', searchTerm);
        }
        
        const response = await fetch(`/api/blog?${params.toString()}`);
        const result = await response.json();
        
        if (result.success) {
          setPosts(result.data);
        } else {
          setError(result.error || 'Failed to fetch posts');
        }
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredPosts();
  }, [selectedCategory, searchTerm]);

  const filteredPosts = posts;

  return (
    <div className={styles.container}>
      <div className={styles.blogApp}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Blog</h1>
          <p className={styles.subtitle}>Thoughts, tutorials, and insights</p>
        </header>

        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.categoryFilter}>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading posts...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()} className={styles.retryButton}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className={styles.postsGrid}>
            {filteredPosts.map(post => (
              <article key={post.id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span className={styles.postCategory}>{post.category}</span>
                </div>
                
                <p className={styles.postContent}>{post.excerpt}</p>
                
                <div className={styles.postMeta}>
                  <div className={styles.authorInfo}>
                    <span className={styles.author}>By {post.author}</span>
                    <span className={styles.date}>{post.date}</span>
                  </div>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                
                <Link href={`/blog/${post.id}`} className={styles.readMoreButton}>
                  Read More
                </Link>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && filteredPosts.length === 0 && (
          <div className={styles.emptyState}>
            <p>No posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
