import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { usePosts } from '../contexts/PostsContext';
import PostForm from '../components/PostForm';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';

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
      alert('Error creating post: ' + err.message);
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
      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate('/admin')}
              className="text-linkblue underline font-mono text-body hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-linkblue focus:ring-offset-2 rounded"
            >
              ← Back to Admin Dashboard
            </button>
          </div>

          <h1 className="text-header font-mono font-semibold mb-8 text-gray-900">
            Create New Post
          </h1>
          
          <PostForm 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={false}
          />
        </div>
      </div>
    </>
  );
}
