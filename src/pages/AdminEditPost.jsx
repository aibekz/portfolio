import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { usePosts } from '../contexts/PostsContext';
import PostForm from '../components/PostForm';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';

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
      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-header font-mono font-semibold mb-4 text-primary">
            Post Not Found
          </h1>
          <p className="text-body font-mono text-primary mb-6">
            The post you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/admin')}
            className="nav-link underline font-mono text-body focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
          >
            Back to Admin Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (formData) => {
    try {
      await updatePost(id, formData);
      navigate('/admin');
    } catch (err) {
      alert('Error updating post: ' + err.message);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <>
      <SEO 
        title={`Edit: ${post.title} - Admin - Aibek Z.`}
        description={`Edit post: ${post.title}`}
        url={`${siteConfig.url}/admin/posts/${id}/edit`}
      />
      <div className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate('/admin')}
              className="nav-link underline font-mono text-body focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
            >
              ← Back to Admin Dashboard
            </button>
          </div>

          <h1 className="text-header font-mono font-semibold mb-8 text-primary">
            Edit Post
          </h1>
          
          <PostForm 
            post={post}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditing={true}
          />
        </div>
      </div>
    </>
  );
}
