import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

async function addIndexes() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const postsCollection = db.collection('posts');

    // Add indexes for better query performance
    console.log('Creating indexes...');

    // Index on date field (descending) for sorting posts by newest first
    await postsCollection.createIndex({ date: -1 });
    console.log('✓ Created index on date field');

    // Index on slug field for unique slug lookups
    await postsCollection.createIndex({ slug: 1 }, { unique: true });
    console.log('✓ Created unique index on slug field');

    // Compound index on date and _id for pagination
    await postsCollection.createIndex({ date: -1, _id: -1 });
    console.log('✓ Created compound index on date and _id');

    // Index on createdAt for stats queries
    await postsCollection.createIndex({ createdAt: -1 });
    console.log('✓ Created index on createdAt field');

    console.log('All indexes created successfully!');
    
    // List all indexes to verify
    const indexes = await postsCollection.listIndexes().toArray();
    console.log('\nCurrent indexes:');
    indexes.forEach(index => {
      console.log(`- ${index.name}: ${JSON.stringify(index.key)}`);
    });

  } catch (error) {
    console.error('Error creating indexes:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

addIndexes();
