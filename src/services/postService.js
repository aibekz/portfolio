import authService from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const postService = {
  // Create a new post
  async createPost(postData) {
    try {
      const response = await authService.makeAuthenticatedRequest(`${API_BASE_URL}/posts`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create post');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Get all posts with pagination
  async getAllPosts(page = 1, limit = 50) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts?page=${page}&limit=${limit}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch posts');
      }

      const data = await response.json();
      // Return just the posts array for backward compatibility
      return data.posts || data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  // Get posts with pagination info
  async getPostsWithPagination(page = 1, limit = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts?page=${page}&limit=${limit}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch posts');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching posts with pagination:', error);
      throw error;
    }
  },

  // Get a single post by ID
  async getPostById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch post');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // Get a single post by slug
  async getPostBySlug(slug) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/slug/${slug}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch post');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      throw error;
    }
  },

  // Update a post
  async updatePost(id, updateData) {
    try {
      const response = await authService.makeAuthenticatedRequest(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update post');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  // Delete a post
  async deletePost(id) {
    try {
      const response = await authService.makeAuthenticatedRequest(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete post');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  // Get posts count and recent posts for dashboard stats
  async getPostStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/stats/summary`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch post stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching post stats:', error);
      throw error;
    }
  }
};
