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
            <h1 className="text-header font-mono font-semibold text-darktext mb-4 sm:mb-0">
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
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-body font-mono font-semibold text-darktext mb-2">
                Total Posts
              </h3>
              <p className="text-2xl font-mono font-bold text-linkblue">
                {statsLoading ? '...' : stats.totalPosts}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-body font-mono font-semibold text-darktext mb-2">
                Recent Posts
              </h3>
              <p className="text-2xl font-mono font-bold text-linkblue">
                {statsLoading ? '...' : stats.recentPosts}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-body font-mono font-semibold text-darktext mb-2">
                Quick Actions
              </h3>
              <Link 
                to="/posts"
                className="text-linkblue underline font-mono text-body hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-linkblue focus:ring-offset-2 rounded"
              >
                View Public Posts
              </Link>
            </div>
          </div>

          {/* Posts Management */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-body font-mono font-semibold text-darktext">
                Manage Posts
              </h2>
            </div>
            
            {loading ? (
              <div className="px-6 py-12 text-center">
                <p className="text-body font-mono text-darktext">
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
                <p className="text-body font-mono text-darktext mb-6">
                  No posts yet. Create your first post!
                </p>
                <Button to="/admin/posts/create" variant="primary">
                  Create New Post
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <div key={post.id} className="px-6 py-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-body font-mono font-semibold text-darktext mb-1">
                          {post.title}
                        </h3>
                        <p className="text-sm font-mono text-darktext">
                          {formatDate(post.date)}
                        </p>
                        <p className="text-sm font-mono text-gray-500 mt-1">
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
