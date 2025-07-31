import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { postService } from '../services/postService.js';
import { CACHE_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/index.js';

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useRef({
    posts: null,
    timestamp: null,
    CACHE_DURATION: CACHE_CONFIG.POSTS_DURATION
  });

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async (forceRefresh = false) => {
    try {
      // Check cache first
      const now = Date.now();
      const cache = cacheRef.current;
      
      if (!forceRefresh && cache.posts && cache.timestamp && 
          (now - cache.timestamp) < cache.CACHE_DURATION) {
        setPosts(cache.posts);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      const fetchedPosts = await postService.getAllPosts();
      
      // Update cache
      cache.posts = fetchedPosts;
      cache.timestamp = now;
      
      setPosts(fetchedPosts);
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.GENERIC;
      setError(errorMessage);
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
      
      // Update cache
      const cache = cacheRef.current;
      if (cache.posts) {
        cache.posts = [newPost, ...cache.posts];
        cache.timestamp = Date.now();
      }
      
      // Could show success message here if needed
      console.log(SUCCESS_MESSAGES.POST_CREATED);
      
      return newPost;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.GENERIC;
      setError(errorMessage);
      console.error('Error creating post:', err);
      throw err;
    }
  };

  // Read all posts
  const getAllPosts = () => posts;

  // Read a single post by ID
  const getPostById = (id) => posts.find(post => post.id === id);

  // Read a single post by slug
  const getPostBySlug = async (slug) => {
    // First try to find in local cache
    const cachedPost = posts.find(post => post.slug === slug);
    if (cachedPost) {
      return cachedPost;
    }
    
    // If not found in cache, fetch from API
    try {
      const post = await postService.getPostBySlug(slug);
      if (post) {
        // Add to local cache if found
        setPosts(prev => {
          // Check if post already exists (by ID) to avoid duplicates
          const exists = prev.find(p => p.id === post.id);
          if (exists) {
            return prev;
          }
          return [...prev, post];
        });
        
        // Update cache
        const cache = cacheRef.current;
        if (cache.posts) {
          const exists = cache.posts.find(p => p.id === post.id);
          if (!exists) {
            cache.posts = [...cache.posts, post];
          }
        }
      }
      return post;
    } catch (err) {
      console.error('Error fetching post by slug:', err);
      return null;
    }
  };

  // Update a post
  const updatePost = async (id, updatedData) => {
    try {
      setError(null);
      const updatedPost = await postService.updatePost(id, updatedData);
      setPosts(prev => prev.map(post => 
        post.id === id ? updatedPost : post
      ));
      
      // Update cache
      const cache = cacheRef.current;
      if (cache.posts) {
        cache.posts = cache.posts.map(post => 
          post.id === id ? updatedPost : post
        );
        cache.timestamp = Date.now();
      }
      
      console.log(SUCCESS_MESSAGES.POST_UPDATED);
      
      return updatedPost;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.GENERIC;
      setError(errorMessage);
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
      
      // Update cache
      const cache = cacheRef.current;
      if (cache.posts) {
        cache.posts = cache.posts.filter(post => post.id !== id);
        cache.timestamp = Date.now();
      }
      
      console.log(SUCCESS_MESSAGES.POST_DELETED);
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.GENERIC;
      setError(errorMessage);
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
