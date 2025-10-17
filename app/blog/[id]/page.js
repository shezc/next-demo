'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import styles from './page.module.css';

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${params.id}`);
        const result = await response.json();
        
        if (result.success) {
          setPost(result.data);
        } else {
          setError(result.error || 'Failed to fetch post');
        }
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Navigation />
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Navigation />
        <div className={styles.error}>
          <h1>Error Loading Article</h1>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Retry
          </button>
          <Link href="/blog" className={styles.backButton}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!loading && !post) {
    return (
      <div className={styles.container}>
        <Navigation />
        <div className={styles.notFound}>
          <h1>Article Not Found</h1>
          <p>The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog" className={styles.backButton}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navigation />
      <article className={styles.article}>
        <div className={styles.articleHeader}>
          <div className={styles.breadcrumb}>
            <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{post.title}</span>
          </div>
          
          <h1 className={styles.articleTitle}>{post.title}</h1>
          
          <div className={styles.articleMeta}>
            <div className={styles.authorInfo}>
              <span className={styles.author}>By {post.author}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
            <div className={styles.articleTags}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.readTime}>{post.readTime}</span>
            </div>
          </div>
          
          <div className={styles.tags}>
            {post.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
        
        <div className={styles.articleContent}>
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return <br key={index} />;
            
            // Handle code blocks
            if (paragraph.startsWith('```')) {
              return null; // Skip code block markers for now
            }
            
            // Handle headers
            if (paragraph.startsWith('## ')) {
              return <h2 key={index} className={styles.subheading}>{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={index} className={styles.subheading}>{paragraph.replace('### ', '')}</h3>;
            }
            
            // Handle lists
            if (paragraph.startsWith('- **') && paragraph.includes('**')) {
              const text = paragraph.replace('- **', '').replace('**', '');
              return <li key={index} className={styles.listItem}>{text}</li>;
            }
            if (paragraph.startsWith('- ')) {
              return <li key={index} className={styles.listItem}>{paragraph.replace('- ', '')}</li>;
            }
            
            // Handle numbered lists
            if (/^\d+\./.test(paragraph)) {
              return <li key={index} className={styles.listItem}>{paragraph.replace(/^\d+\.\s*/, '')}</li>;
            }
            
            // Regular paragraphs
            return <p key={index} className={styles.paragraph}>{paragraph}</p>;
          })}
        </div>
        
        <div className={styles.articleFooter}>
          <Link href="/blog" className={styles.backButton}>
            ← Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
