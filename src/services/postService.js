import { apiClient } from '../utils/api.js';
import authService from './authService.js';

export const postService = {
  // Create a new post
  async createPost(postData) {
    try {
      // Use authenticated request through authService for now
      // TODO: Integrate with apiClient's authentication handling
      const response = await authService.makeAuthenticatedRequest('/posts', {
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
      const data = await apiClient.get('/posts', { page, limit });
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
      return await apiClient.get('/posts', { page, limit });
    } catch (error) {
      console.error('Error fetching posts with pagination:', error);
      throw error;
    }
  },

  // Get a single post by ID
  async getPostById(id) {
    try {
      return await apiClient.get(`/posts/${id}`);
    } catch (error) {
      if (error.status === 404) {
        return null;
      }
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // Get a single post by slug
  async getPostBySlug(slug) {
    try {
      return await apiClient.get(`/posts/slug/${slug}`);
    } catch (error) {
      if (error.status === 404) {
        return null;
      }
      console.error('Error fetching post by slug:', error);
      throw error;
    }
  },

  // Update a post
  async updatePost(id, updateData) {
    try {
      // Use authenticated request through authService for now
      // TODO: Integrate with apiClient's authentication handling
      const response = await authService.makeAuthenticatedRequest(`/posts/${id}`, {
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
      // Use authenticated request through authService for now
      // TODO: Integrate with apiClient's authentication handling
      const response = await authService.makeAuthenticatedRequest(`/posts/${id}`, {
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
      return await apiClient.get('/posts/stats/summary');
    } catch (error) {
      console.error('Error fetching post stats:', error);
      throw error;
    }
  }
};
