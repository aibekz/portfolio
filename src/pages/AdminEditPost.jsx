import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { usePosts } from '../contexts/PostsContext';
import PostForm from '../components/PostForm';

export default function AdminEditPost() {
  const { isAuthenticated, isLoading } = useAdmin();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getPostById, updatePost } = usePosts();
  
  const post = getPostById(id);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-bg-dark relative overflow-hidden flex items-center justify-center">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid-pattern"></div>
        </div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-matrix-green opacity-3 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 text-center">
          <div className="backdrop-blur-sm bg-bg-dark/50 border border-matrix-green/20 rounded-2xl p-12 shadow-2xl max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <svg className="w-full h-full text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-mono font-bold text-fg-light mb-4">
              Post Not Found
            </h1>
            <p className="text-fg-light/70 font-mono mb-8">
              The post you're looking for doesn't exist or may have been deleted.
            </p>
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center text-matrix-green hover:text-matrix-green/80 font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 rounded-lg px-3 py-2"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (formData) => {
    try {
      await updatePost(id, formData);
      navigate('/admin');
    } catch (err) {
      alert(`Error updating post: ${  err.message}`);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <>
      <div className="min-h-screen bg-bg-dark relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid-pattern"></div>d 
        </div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-matrix-green opacity-3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-matrix-green opacity-2 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <div className="mb-8">
              <button
                onClick={() => navigate('/admin')}
                className="inline-flex items-center text-matrix-green hover:text-matrix-green/80 font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 rounded-lg px-3 py-2"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Admin Dashboard
              </button>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-matrix-green/10 to-transparent border border-matrix-green/20 mb-6">
                <div className="w-12 h-12 mx-auto">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-matrix-green">
                    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-mono font-bold text-fg-light mb-3">
                Edit Post
              </h1>
              <p className="text-fg-light/70 font-mono">
                Update "{post.title}"
              </p>
            </div>
            
            {/* Form container */}
            <div className="backdrop-blur-sm bg-bg-dark/50 border border-matrix-green/20 rounded-2xl p-8 shadow-2xl">
              <PostForm 
                post={post}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
