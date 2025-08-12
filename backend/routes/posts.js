import express from 'express';
import Post from '../models/Post.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/posts - Get all posts with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100); // Increased default, max 100
    const skip = (page - 1) * limit;

    // Use Promise.all to run queries in parallel for better performance
    const [posts, totalPosts] = await Promise.all([
      Post.find()
        .select('title content slug date createdAt updatedAt') // Only select needed fields
        .sort({ date: -1 }) // Sort by date, newest first
        .skip(skip)
        .limit(limit)
        .lean(), // Use lean() for better performance
      Post.countDocuments()
    ]);
    
    // Format posts for frontend
    const formattedPosts = posts.map(post => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      slug: post.slug,
      date: post.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }));
    
    // Set cache headers for better performance
    res.set({
      'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      'ETag': `"posts-${totalPosts}-${posts.length}"`
    });
    
    res.json({
      posts: formattedPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        hasNextPage: page < Math.ceil(totalPosts / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:id - Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const formattedPost = {
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      slug: post.slug,
      date: post.date.toISOString().split('T')[0],
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    };
    
    res.json(formattedPost);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// GET /api/posts/slug/:slug - Get a single post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const formattedPost = {
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      slug: post.slug,
      date: post.date.toISOString().split('T')[0],
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    };
    
    res.json(formattedPost);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// POST /api/posts - Create a new post
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, date } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const post = new Post({
      title,
      content,
      date: date ? new Date(date) : new Date()
    });
    
    const savedPost = await post.save();
    
    const formattedPost = {
      id: savedPost._id.toString(),
      title: savedPost.title,
      content: savedPost.content,
      slug: savedPost.slug,
      date: savedPost.date.toISOString().split('T')[0],
      createdAt: savedPost.createdAt,
      updatedAt: savedPost.updatedAt
    };
    
    res.status(201).json(formattedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'A post with this title already exists' });
    } else {
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
});

// PUT /api/posts/:id - Update a post
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, content, date } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const updateData = {
      title,
      content,
      ...(date && { date: new Date(date) })
    };
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const formattedPost = {
      id: post._id.toString(),
      title: post.title,
      content: post.content,
      slug: post.slug,
      date: post.date.toISOString().split('T')[0],
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    };
    
    res.json(formattedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'A post with this title already exists' });
    } else {
      res.status(500).json({ error: 'Failed to update post' });
    }
  }
});

// DELETE /api/posts/:id - Delete a post
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// GET /api/posts/stats/summary - Get post statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const recentPosts = await Post.countDocuments({
      createdAt: { $gte: weekAgo }
    });
    
    res.json({
      totalPosts,
      recentPosts
    });
  } catch (error) {
    console.error('Error fetching post stats:', error);
    res.status(500).json({ error: 'Failed to fetch post stats' });
  }
});

export default router;
