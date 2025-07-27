import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Generate slug from title if not provided
postSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Ensure slug uniqueness by appending number if needed
postSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('title')) {
    let baseSlug = this.slug;
    let counter = 1;
    
    while (await this.constructor.findOne({ slug: this.slug, _id: { $ne: this._id } })) {
      this.slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }
  next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;
