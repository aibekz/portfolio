import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';
import { usePosts } from '../contexts/PostsContext';

// Format date to be more readable
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
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
            <p className="text-body font-mono text-gray-600">Loading posts...</p>
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
              className="text-linkblue underline font-mono text-body hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-linkblue focus:ring-offset-2 rounded"
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
      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-header font-mono font-semibold mb-8 text-gray-900">
            Posts
          </h1>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-body font-mono text-gray-600">
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex flex-col gap-2">
                    <time 
                      dateTime={post.date}
                      className="text-gray-600 font-mono text-sm block"
                    >
                      {formatDate(post.date)}
                    </time>
                    <h2>
                      <Link 
                        to={`/posts/${post.id}`}
                        className="text-linkblue text-body font-mono hover:text-black focus:outline-none focus:ring-2 focus:ring-linkblue focus:ring-offset-2 rounded"
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
