import { useState, useEffect } from 'react';
import Button from './ui/Button';
import MarkdownRenderer from './MarkdownRenderer';

export default function PostForm({ post, onSubmit, onCancel, isEditing = false }) {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [showPreview, setShowPreview] = useState(false);

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
        <label htmlFor="title" className="block text-body font-mono font-semibold mb-2 text-primary">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Enter post title..."
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="content" className="block text-body font-mono font-semibold text-primary">
            Content
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className={`px-3 py-1 text-sm font-mono rounded transition-colors duration-200 ${
                !showPreview 
                  ? 'text-matrix-green border border-matrix-green bg-matrix-green/10' 
                  : 'border border-fg-light/20 text-fg-light hover:border-matrix-green/50'
              }`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className={`px-3 py-1 text-sm font-mono rounded transition-colors duration-200 ${
                showPreview 
                  ? 'text-matrix-green border border-matrix-green bg-matrix-green/10' 
                  : 'border border-fg-light/20 text-fg-light hover:border-matrix-green/50'
              }`}
            >
              Preview
            </button>
          </div>
        </div>
        
        {!showPreview ? (
          <div>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-vertical"
              placeholder="Write your post content using Markdown...

Examples:
# Heading 1
## Heading 2
**Bold text**
*Italic text*
[Link](https://example.com)
`inline code`

```javascript
// Code block
console.log('Hello, world!');
```

- List item 1
- List item 2

> Blockquote"
            />
            <p className="text-sm text-primary font-mono mt-2">
              Supports Markdown formatting including headers, links, code blocks, lists, and more.
            </p>
          </div>
        ) : (
          <div className="border border-gray-300 rounded-md p-4 min-h-[400px] bg-white">
            <div className="text-sm text-primary font-mono mb-4 border-b border-gray-200 pb-2">
              Preview:
            </div>
            {formData.content.trim() ? (
              <MarkdownRenderer content={formData.content} />
            ) : (
              <p className="text-gray-500 font-mono italic">
                Start writing to see the preview...
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" variant="primary">
          {isEditing ? 'Update Post' : 'Create Post'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
