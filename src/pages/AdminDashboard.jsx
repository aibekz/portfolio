import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { usePosts } from '../contexts/PostsContext';
import Button from '../components/ui/Button';
import { 
  PlusIcon, 
  ArrowRightOnRectangleIcon, 
  DocumentTextIcon, 
  ClockIcon, 
  BoltIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon, 
  CalendarIcon,
  ExclamationTriangleIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';

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
        alert(`Error deleting post: ${  err.message}`);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="min-h-screen bg-bg-dark relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid-pattern"></div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-matrix-green opacity-3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-matrix-green opacity-2 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
              <div>
                <h1 className="text-4xl font-mono font-bold text-fg-light mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-fg-light/70 font-mono">
                  Manage your content and monitor performance
                </p>
              </div>
              <div className="flex gap-3 mt-6 sm:mt-0">
                <button
                  onClick={() => navigate('/admin/posts/create')}
                  className="px-6 py-3 bg-gradient-to-r from-matrix-green to-matrix-green/80 text-bg-dark font-mono font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-matrix-green/25 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Create New Post
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-bg-dark/80 border border-fg-light/20 text-fg-light font-mono font-semibold rounded-xl transition-all duration-300 hover:border-matrix-green/50 hover:shadow-lg hover:shadow-matrix-green/10 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center">
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                    Logout
                  </div>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="backdrop-blur-sm bg-bg-dark/50 border border-matrix-green/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-mono font-semibold text-fg-light/90">
                    Total Posts
                  </h3>
                  <div className="p-2 rounded-lg bg-matrix-green/10">
                    <DocumentTextIcon className="w-6 h-6 text-matrix-green" />
                  </div>
                </div>
                <div className="text-3xl font-mono font-bold text-matrix-green">
                  {statsLoading ? (
                    <div className="w-8 h-8 border-2 border-matrix-green/30 border-t-matrix-green rounded-full animate-spin"></div>
                  ) : (
                    stats.totalPosts
                  )}
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-bg-dark/50 border border-matrix-green/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-mono font-semibold text-fg-light/90">
                    Recent Posts
                  </h3>
                  <div className="p-2 rounded-lg bg-matrix-green/10">
                    <ClockIcon className="w-6 h-6 text-matrix-green" />
                  </div>
                </div>
                <div className="text-3xl font-mono font-bold text-matrix-green">
                  {statsLoading ? (
                    <div className="w-8 h-8 border-2 border-matrix-green/30 border-t-matrix-green rounded-full animate-spin"></div>
                  ) : (
                    stats.recentPosts
                  )}
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-bg-dark/50 border border-matrix-green/20 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-mono font-semibold text-fg-light/90">
                    Quick Actions
                  </h3>
                  <div className="p-2 rounded-lg bg-matrix-green/10">
                    <BoltIcon className="w-6 h-6 text-matrix-green" />
                  </div>
                </div>
                <button
                  onClick={() => navigate('/posts')}
                  className="text-matrix-green hover:text-matrix-green/80 font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 rounded-lg px-2 py-1 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Public Posts
                </button>
              </div>
            </div>

            {/* Posts Management */}
            <div className="backdrop-blur-sm bg-bg-dark/50 border border-matrix-green/20 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-matrix-green/20">
                <h2 className="text-xl font-mono font-semibold text-fg-light flex items-center">
                  <svg className="w-6 h-6 mr-3 text-matrix-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Manage Posts
                </h2>
              </div>
              
              {loading ? (
                <div className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-8 h-8 border-2 border-matrix-green/30 border-t-matrix-green rounded-full animate-spin"></div>
                  </div>
                  <p className="text-fg-light/70 font-mono">
                    Loading posts...
                  </p>
                </div>
              ) : error ? (
                <div className="px-6 py-12 text-center">
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 mb-6">
                    <p className="text-red-400 font-mono flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Error loading posts: {error}
                    </p>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-bg-dark/80 border border-fg-light/20 text-fg-light font-mono font-semibold rounded-xl transition-all duration-300 hover:border-matrix-green/50 hover:shadow-lg hover:shadow-matrix-green/10 focus:outline-none focus:ring-2 focus:ring-matrix-green/50"
                  >
                    Try Again
                  </button>
                </div>
              ) : posts.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 p-4 rounded-2xl bg-matrix-green/10 border border-matrix-green/20">
                      <svg className="w-full h-full text-matrix-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-fg-light/70 font-mono mb-6">
                      No posts yet. Create your first post to get started!
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/admin/posts/create')}
                    className="px-6 py-3 bg-gradient-to-r from-matrix-green to-matrix-green/80 text-bg-dark font-mono font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-matrix-green/25 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Create New Post
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-matrix-green/10">
                  {posts.map((post) => (
                    <div key={post.id} className="px-6 py-6 hover:bg-matrix-green/5 transition-colors duration-200">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-mono font-semibold text-fg-light mb-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center text-sm font-mono text-fg-light/60 mb-2">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(post.date)}
                          </div>
                          <p className="text-sm font-mono text-fg-light/70 line-clamp-2">
                            {post.content.substring(0, 150)}...
                          </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => navigate(`/posts/${post.slug}`)}
                            className="px-4 py-2 bg-bg-dark/80 border border-fg-light/20 text-fg-light font-mono text-sm rounded-lg transition-all duration-300 hover:border-matrix-green/50 hover:shadow-lg hover:shadow-matrix-green/10 focus:outline-none focus:ring-2 focus:ring-matrix-green/50"
                          >
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              View
                            </div>
                          </button>
                          <button
                            onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                            className="px-4 py-2 bg-matrix-green/10 border border-matrix-green/30 text-matrix-green font-mono text-sm rounded-lg transition-all duration-300 hover:bg-matrix-green/20 hover:shadow-lg hover:shadow-matrix-green/10 focus:outline-none focus:ring-2 focus:ring-matrix-green/50"
                          >
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </div>
                          </button>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-sm rounded-lg transition-all duration-300 hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                          >
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
