import { useState, useEffect } from 'react';
import Button from './ui/Button';

export default function PostForm({ post, onSubmit, onCancel, isEditing = false }) {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || ''
      });
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      onSubmit(formData);
      if (!isEditing) {
        setFormData({ title: '', content: '' });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-body font-mono font-semibold mb-2 text-gray-900">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-body focus:outline-none focus:ring-2 focus:ring-linkblue focus:border-transparent"
          placeholder="Enter post title..."
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-body font-mono font-semibold mb-2 text-gray-900">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-body focus:outline-none focus:ring-2 focus:ring-linkblue focus:border-transparent resize-vertical"
          placeholder="Write your post content..."
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" variant="primary">
          {isEditing ? 'Update Post' : 'Create Post'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
