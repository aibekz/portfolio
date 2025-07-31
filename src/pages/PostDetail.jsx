import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePosts } from '../contexts/PostsContext';
import SEO from '../components/SEO';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { siteConfig } from '../constants/siteConfig';

// Format date to be more readable
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
};

export default function PostDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { getPostBySlug } = usePosts();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedPost = await getPostBySlug(slug);
        setPost(fetchedPost);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, getPostBySlug]);

  if (loading) {
    return (
      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-body font-mono text-primary">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-header font-mono font-semibold mb-4 text-primary">
            Error Loading Post
          </h1>
          <p className="text-body font-mono text-red-600 mb-6">
            {error}
          </p>
          <button
            onClick={() => navigate('/posts')}
            className="nav-link underline font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-header font-mono font-semibold mb-4 text-primary">
            Post Not Found
          </h1>
          <p className="text-body font-mono mb-6 text-primary">
            The post you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/posts')}
            className="nav-link underline font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} - Aibek Z.`}
        description={`${post.content.substring(0, 160)  }...`}
        url={`${siteConfig.url}/posts/${slug}`}
      />
      <div className="flex-1 px-6 py-8 mt-8">
        <div className="max-w-3xl mx-auto">

          {/* Post header */}
          <header className="mb-10">
            <time 
              dateTime={post.date}
              className="text-sm font-mono font-medium block mb-3 text-muted"
            >
              {formatDate(post.date)}
            </time>
            <h1 className="text-header font-mono font-semibold leading-tight text-primary">
              {post.title}
            </h1>
          </header>

          {/* Post content */}
          <article className="prose prose-lg max-w-2xl">
            <MarkdownRenderer content={post.content} />
          </article>

          {/* Back button */}
          <button
            onClick={() => navigate('/posts')}
            className="nav-link font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 rounded mt-8"
          >
            ← Back to Posts
          </button>
        </div>
      </div>
    </>
  );
}
