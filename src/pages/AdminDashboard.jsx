import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { usePosts } from '../contexts/PostsContext';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';
import Button from '../components/ui/Button';

// Format date to be more readable
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
};

export default function AdminDashboard() {
  const { isAuthenticated, isLoading, logout } = useAdmin();
  const { posts, deletePost, loading, error, getPostStats } = usePosts();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalPosts: 0, recentPosts: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    // Wait for authentication check to complete before redirecting
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    } else if (!isLoading && isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated, isLoading, navigate]);

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      const statsData = await getPostStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deletePost(id);
        // Reload stats after deletion
        loadStats();
      } catch (err) {
        alert('Error deleting post: ' + err.message);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <SEO 
        title="Admin Dashboard - Aibek Z."
        description="Admin dashboard for managing posts"
        url={`${siteConfig.url}/admin`}
      />
      <div className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h1 className="text-header font-mono font-semibold mb-4 sm:mb-0" style={{ color: 'var(--text-color)' }}>
              Admin Dashboard
            </h1>
            <div className="flex gap-3">
              <Button to="/admin/posts/create" variant="primary">
                Create New Post
              </Button>
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <h3 className="text-body font-mono font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                Total Posts
              </h3>
              <p className="text-2xl font-mono font-bold" style={{ color: 'var(--link-color)' }}>
                {statsLoading ? '...' : stats.totalPosts}
              </p>
            </div>
            <div className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <h3 className="text-body font-mono font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                Recent Posts
              </h3>
              <p className="text-2xl font-mono font-bold" style={{ color: 'var(--link-color)' }}>
                {statsLoading ? '...' : stats.recentPosts}
              </p>
            </div>
            <div className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--hover-bg)' }}>
              <h3 className="text-body font-mono font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                Quick Actions
              </h3>
              <Link 
                to="/posts"
                className="underline font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 rounded transition-colors duration-200"
                style={{ color: 'var(--link-color)' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                View Public Posts
              </Link>
            </div>
          </div>

          {/* Posts Management */}
          <div className="rounded-lg overflow-hidden transition-colors duration-200" style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)' }}>
            <div className="px-6 py-4 transition-colors duration-200" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <h2 className="text-body font-mono font-semibold" style={{ color: 'var(--text-color)' }}>
                Manage Posts
              </h2>
            </div>
            
            {loading ? (
              <div className="px-6 py-12 text-center">
                <p className="text-body font-mono" style={{ color: 'var(--text-color)' }}>
                  Loading posts...
                </p>
              </div>
            ) : error ? (
              <div className="px-6 py-12 text-center">
                <p className="text-body font-mono text-red-600 mb-4">
                  Error loading posts: {error}
                </p>
                <Button variant="secondary" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : posts.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-body font-mono mb-6" style={{ color: 'var(--text-color)' }}>
                  No posts yet. Create your first post!
                </p>
                <Button to="/admin/posts/create" variant="primary">
                  Create New Post
                </Button>
              </div>
            ) : (
              <div style={{ borderColor: 'var(--border-color)' }} className="divide-y">
                {posts.map((post) => (
                  <div key={post.id} className="px-6 py-4" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-body font-mono font-semibold mb-1" style={{ color: 'var(--text-color)' }}>
                          {post.title}
                        </h3>
                        <p className="text-sm font-mono" style={{ color: 'var(--text-color)' }}>
                          {formatDate(post.date)}
                        </p>
                        <p className="text-sm font-mono mt-1" style={{ color: 'var(--text-color)', opacity: '0.7' }}>
                          {post.content.substring(0, 100)}...
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          to={`/posts/${post.slug}`}
                          variant="secondary"
                          size="sm"
                        >
                          View
                        </Button>
                        <Button
                          to={`/admin/posts/${post.id}/edit`}
                          variant="secondary"
                          size="sm"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(post.id, post.title)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
