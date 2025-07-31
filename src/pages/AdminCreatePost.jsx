import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { usePosts } from '../contexts/PostsContext';
import PostForm from '../components/PostForm';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function AdminCreatePost() {
  const { isAuthenticated, isLoading } = useAdmin();
  const navigate = useNavigate();
  const { createPost } = usePosts();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (formData) => {
    try {
      await createPost(formData);
      navigate('/admin');
    } catch (err) {
      alert(`Error creating post: ${  err.message}`);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <>
      <SEO 
        title="Create Post - Admin - Aibek Z."
        description="Create a new blog post"
        url={`${siteConfig.url}/admin/posts/create`}
      />
      <div className="min-h-screen bg-bg-dark relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid-pattern"></div>
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
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Admin Dashboard
              </button>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-matrix-green/10 to-transparent border border-matrix-green/20 mb-6">
                <PlusIcon className="w-12 h-12 mx-auto text-matrix-green" />
              </div>
              <h1 className="text-4xl font-mono font-bold text-fg-light mb-3">
                Create New Post
              </h1>
              <p className="text-fg-light/70 font-mono">
                Share your thoughts with the world
              </p>
            </div>
            
            {/* Form container */}
            <div className="backdrop-blur-sm bg-bg-dark/50 border border-matrix-green/20 rounded-2xl p-8 shadow-2xl">
              <PostForm 
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEditing={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
