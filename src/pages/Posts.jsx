import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';
import { usePosts } from '../contexts/PostsContext';

// Format date to be more readable
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });   
};

export default function Posts() {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return (
      <>
        <SEO 
          title="Posts - Aibek Z."
          description="Blog posts and articles by Aibek Z."
          url={`${siteConfig.url}/posts`}
        />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-body font-mono" style={{ color: 'var(--text-color)' }}>Loading posts...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEO 
          title="Posts - Aibek Z."
          description="Blog posts and articles by Aibek Z."
          url={`${siteConfig.url}/posts`}
        />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-body font-mono text-red-600 mb-4">Error loading posts: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="underline font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 rounded transition-colors duration-200"
              style={{ color: 'var(--link-color)' }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Posts - Aibek Z."
        description="Blog posts and articles by Aibek Z."
        url={`${siteConfig.url}/posts`}
      />
      <div className="flex-1 px-6 py-8 mt-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-header font-mono font-semibold mb-8" style={{ color: 'var(--text-color)' }}>
            Posts
          </h1>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-body font-mono" style={{ color: 'var(--text-color)' }}>
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.id}>
                  <div className="flex flex-col gap-2">
                    <time className="text-sm font-mono font-medium" style={{ color: 'var(--text-color)', opacity: '0.7' }}>
                      {formatDate(post.createdAt)}
                    </time>
                    <h2>
                      <Link 
                        to={`/posts/${post.slug}`}
                        className="text-body font-mono hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded transition-colors duration-200"
                        style={{ color: 'var(--link-color)' }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--text-color)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--link-color)'}
                      >
                        {post.title}
                      </Link>
                    </h2>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
