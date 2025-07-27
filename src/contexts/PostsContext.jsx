import { createContext, useContext, useState, useEffect } from 'react';
import { postService } from '../services/postService.js';

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await postService.getAllPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError(err.message);
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async (postData) => {
    try {
      setError(null);
      const newPost = await postService.createPost(postData);
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      setError(err.message);
      console.error('Error creating post:', err);
      throw err;
    }
  };

  // Read all posts
  const getAllPosts = () => posts;

  // Read a single post by ID
  const getPostById = (id) => posts.find(post => post.id === id);

  // Read a single post by slug
  const getPostBySlug = (slug) => posts.find(post => post.slug === slug);

  // Update a post
  const updatePost = async (id, updatedData) => {
    try {
      setError(null);
      const updatedPost = await postService.updatePost(id, updatedData);
      setPosts(prev => prev.map(post => 
        post.id === id ? updatedPost : post
      ));
      return updatedPost;
    } catch (err) {
      setError(err.message);
      console.error('Error updating post:', err);
      throw err;
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    try {
      setError(null);
      await postService.deletePost(id);
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting post:', err);
      throw err;
    }
  };

  // Get post statistics
  const getPostStats = async () => {
    try {
      return await postService.getPostStats();
    } catch (err) {
      console.error('Error fetching post stats:', err);
      return { totalPosts: posts.length, recentPosts: 0 };
    }
  };

  const value = {
    posts,
    loading,
    error,
    createPost,
    getAllPosts,
    getPostById,
    getPostBySlug,
    updatePost,
    deletePost,
    getPostStats,
    refreshPosts: loadPosts
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}
